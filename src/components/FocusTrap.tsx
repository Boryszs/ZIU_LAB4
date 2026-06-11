import { useEffect, useRef, type ReactNode, type RefObject } from "react";

interface FocusTrapProps {
  children: ReactNode;
  onEscape?: () => void;
  triggerRef?: RefObject<HTMLElement | null>;
}

function isDisabledControl(element: HTMLElement) {
  return (
    "disabled" in element &&
    Boolean((element as HTMLButtonElement | HTMLInputElement).disabled)
  );
}

function isFocusableElement(element: HTMLElement) {
  if (element.closest('[aria-hidden="true"], [inert]')) return false;
  if (isDisabledControl(element)) return false;

  const style = window.getComputedStyle(element);
  if (style.display === "none" || style.visibility === "hidden") return false;
  if (element.tabIndex < 0) return false;

  const tagName = element.tagName.toLowerCase();

  if (tagName === "a" || tagName === "area") {
    return element.hasAttribute("href");
  }

  if (tagName === "input") {
    return (element as HTMLInputElement).type !== "hidden";
  }

  if (["button", "select", "textarea", "summary"].includes(tagName)) {
    return true;
  }

  return element.isContentEditable || element.hasAttribute("tabindex");
}

function getFocusable(container: HTMLElement) {
  const focusable: HTMLElement[] = [];
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode(node) {
        return isFocusableElement(node as HTMLElement)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      },
    },
  );

  while (walker.nextNode()) {
    focusable.push(walker.currentNode as HTMLElement);
  }

  return focusable;
}

export function FocusTrap({ children, onEscape, triggerRef }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const trapContainer: HTMLElement = container;

    const previouslyFocusedElement =
      triggerRef?.current ??
      (document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null);

    const focusFirstElement = () => {
      const firstFocusable = getFocusable(trapContainer)[0];
      (firstFocusable ?? trapContainer).focus();
    };

    focusFirstElement();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscape?.();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable(trapContainer);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (focusable.length === 0) {
        event.preventDefault();
        trapContainer.focus();
        return;
      }

      if (focusable.length === 1) {
        event.preventDefault();
        first.focus();
        return;
      }

      if (!trapContainer.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [onEscape, triggerRef]);

  return (
    <div ref={containerRef} tabIndex={-1}>
      {children}
    </div>
  );
}
