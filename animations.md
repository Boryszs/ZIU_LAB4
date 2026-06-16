# Podsumowanie Animacji i Mikrointerakcji

### 1. Jakie animacje zostały dodane
* **Animacje przejść między stronami:** Cały obszar `<Outlet />` w `DashboardLayout` został opakowany w `<AnimatePresence mode="wait">` z kluczem ścieżki `location.pathname`. Skutkuje to płynnym przenikaniem widoków (fade + delikatne przesunięcie w osi Y) przy każdej nawigacji (np. przy przejściu z *Dashboard* na *Zadania*).
* **Wejście listy zadań (Staggered Animation):** Lista w `TodoList` to teraz `motion.ul`, a jej elementy to `motion.li`. Zadania wlatują kaskadowo z delikatnym opóźnieniem jedno po drugim.
* **Mikrointerakcja karty zadania (TaskCard):** Najechanie na element w liście zadań powoduje podniesienie (transform) wraz ze zwiększeniem cienia (box-shadow) oraz drobną zmianą tła.

### 2. Jakie akcje użytkownika mają feedback
* **Początkowe ładowanie danych:** Aplikacja symuluje startowy fetch (przez około 800ms) pokazując animowany `<CircularProgress>` w miejscu tabeli, unikając wrażenia "zacinania się".
* **Akcje dodawania/edycji zadań:** Formularz (`AddTodoForm`) podczas "zapisywania" blokuje pola tekstowe oraz przyciski (zapobiegając double-submitowi), a ikona na głównym przycisku zamienia się w kręcący spinner ("Zapisywanie...").
* **Komunikaty globalne (Toasty/Snackbary):** Każde działanie — stworzenie, usunięcie, zaznaczenie checkboxa lub edycja — triggeruje globalny, ładnie pojawiający się u dołu powiadamiacz `Snackbar` (Alert typu success lub error), który dodatkowo obsługuje czytniki ekranowe dzięki `aria-live="polite"`.

### 3. Czy użyto Framer Motion / CSS transitions?
Tak, połączyłem obie techniki w najlepszy możliwy sposób:
* W pliku `src/shared/animations/variants.ts` wydzieliłem centralne stałe (`TRANSITIONS.FAST`, `.PAGE`) i obiekty konfiguracyjne dla Framer Motion.
* Do zaawansowanych przejść tras i listy kaskadowej użyłem zainstalowanego `framer-motion` (ze wsparciem `useReducedMotion`).
* Z kolei zwinny efekt "hover" na karcie zadania (`TaskCard`) zbudowałem na natywnym `CSS transitions` poprzez style w MUI (`sx`), aby nie tworzyć niepotrzebnego over-engineeringu w renderowaniu JS.

### 4. Jak przetestować loading, success i error?
Zaimplementowałem w `TodoContext` mały "kod do oszukiwania" na potrzeby testów (symulator asynchronicznego API z flagą `shouldFail`):
* **Loading i Success:** Standardowo dodaj zadanie lub usuń istniejące. Zobaczysz sztuczne opóźnienie, wyłączone przyciski, kręcący się wskaźnik oraz zielony komunikat o powodzeniu na samym końcu. Odświeżenie strony F5 wywoła startowy "spinner".
* **Error:** Stwórz lub edytuj zadanie, dopisując gdziekolwiek w jego tytule słowo "error" (np. "Kupić mleko error"). System wykryje to słowo, zasymuluje awarię serwera i powita Cię czerwoną ramką błędu, bez resetowania ekranu do strony głównej.

### 5. Jak przetestować `prefers-reduced-motion`?
Wdrożyłem ten wymóg dwutorowo: dla logiki Framer Motion (używając `useReducedMotion()`) oraz dla CSS (poprzez media query `@media (prefers-reduced-motion: reduce)` w `TodoList`).
* **W systemie Windows:** Przejdź do Ustawienia -> Ułatwienia dostępu -> Efekty wizualne i wyłącz opcję "Efekty animacji".
* **W DevTools przeglądarki (Chrome/Edge):** Wciśnij `Ctrl + Shift + P` na odpalonej konsoli -> wpisz *Show Rendering* -> i w otwartej karcie u dołu ekranu znajdź sekcję "Emulate CSS media feature prefers-reduced-motion" i wybierz **reduce**. 
Po aktywacji, aplikacja automatycznie i w czasie rzeczywistym ubezwłasnowolni skoki po osi Y oraz X, sprowadzając wszystkie animacje do ekstremalnie szybkiego i krótkiego "fade-in", a unoszenie w hoverze przestanie działać, chroniąc użytkowników przed niepożądanym ruchem!