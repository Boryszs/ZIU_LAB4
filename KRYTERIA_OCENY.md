# Kryteria oceny projektu

Dokument opisuje, gdzie w projekcie znajdują się elementy odpowiadające wymaganiom z rubryki. Każdy punkt zawiera krótkie wskazanie plików oraz opis sposobu realizacji.

## 2. Implementacja interfejsu — 7 pkt

| Kryterium | Gdzie w projekcie | Krótki opis |
| --- | --- | --- |
| Podział aplikacji na komponenty wielokrotnego użytku | `src/components/common/AppButton.tsx`, `src/components/common/AppSelect.tsx`, `src/components/dashboard/`, `src/components/todo/` | Aplikacja jest rozbita na komponenty wspólne, komponenty dashboardu, listy zadań, formularzy i elementów layoutu. Przykładowo `AppButton` i `AppSelect` są używane w wielu miejscach, a komponenty `TodoList`, `TodoListItem`, `FilterBar` i `StatsCard` odpowiadają za wydzielone części widoku. |
| Routing między widokami | `src/App.tsx`, `src/components/dashboard/DashboardLayout.tsx` | Routing jest oparty o `HashRouter` i `Routes`. Dostępne są m.in. ekrany `/dashboard`, `/tasks`, `/tasks/new`, `/tasks/:todoId/edit`, `/settings` i `/register`, czyli więcej niż wymagane 2-3 widoki. |
| Zastosowanie biblioteki UI | `package.json`, komponenty w `src/components/` | Projekt używa Material UI (`@mui/material`, `@mui/icons-material`) oraz Emotion. MUI odpowiada za m.in. `AppBar`, `Drawer`, `Paper`, `TextField`, `Snackbar`, `Alert`, `Stepper`, `Checkbox`, `Chip` i ikony. |

## 3. Responsive Design — 5 pkt

| Kryterium | Gdzie w projekcie | Krótki opis |
| --- | --- | --- |
| Poprawne działanie na mobile i desktopie | `src/components/dashboard/DashboardLayout.tsx`, `src/components/TodoApp.tsx`, `src/components/MultiStepForm.tsx` | Layout używa responsywnych wartości MUI, np. `xs`, `sm`, `md`, oraz ograniczeń szerokości (`maxWidth`). Widoki formularzy, listy zadań i dashboardu dopasowują odstępy oraz układ do szerokości ekranu. |
| Min. 2 breakpointy lub natywne wzorce nawigacji | `src/components/dashboard/Sidebar.tsx`, `src/components/dashboard/AppHeader.tsx`, `src/components/dashboard/MobileNavigationDrawer.tsx` | Na desktopie działa stały boczny `Drawer`, a na mobile pojawia się przycisk menu i tymczasowy drawer. W kodzie używane są breakpointy `xs`, `sm` i `md`. |
| Ogólna jakość i spójność layoutu | `src/components/dashboard/StatsGrid.tsx`, `src/components/FilterBar.tsx`, `src/theme/createAppTheme.ts` | Układ zachowuje spójne odstępy, kolory, karty i typografię. `StatsGrid` przełącza się z jednej kolumny na mobile na trzy kolumny na większych ekranach, a motyw MUI centralizuje kolory i wygląd komponentów. |

## 4. Formularze i walidacja — 5 pkt

| Kryterium | Gdzie w projekcie | Krótki opis |
| --- | --- | --- |
| Co najmniej jeden formularz z walidacją po stronie klienta | `src/components/AddTodoForm.tsx`, `src/components/MultiStepForm.tsx`, `src/schemas/schemas.ts` | Formularz zadania sprawdza, czy treść nie jest pusta. Formularz rejestracji używa React Hook Form i Zod do walidacji imienia, nazwiska, e-maila, hasła, kategorii i zgody RODO. |
| Czytelne komunikaty błędów widoczne dla użytkownika | `src/components/AddTodoForm.tsx`, `src/components/Step1Form.tsx`, `src/components/Step2Form.tsx`, `src/components/Step3Form.tsx` | Błędy są pokazywane przy konkretnych polach przez `helperText`, `FormHelperText` i `Alert`. Przykłady: zbyt krótkie imię, niepoprawny e-mail, słabe hasło, brak kategorii lub brak zgody RODO. |
| Obsługa stanu formularza | `src/components/MultiStepForm.tsx`, `src/components/Step1Form.tsx`, `src/components/Step2Form.tsx`, `src/components/Step3Form.tsx` | Formularz rejestracji używa `useForm`, `FormProvider`, `useFormContext`, `Controller` i `useFieldArray`. Stan ładowania formularzy jest obsługiwany przez `isSubmitting` oraz warianty przycisków z `loading`. |

## 5. Dostępność — WCAG — 8 pkt

| Kryterium | Gdzie w projekcie | Krótki opis |
| --- | --- | --- |
| Semantyczny HTML, `aria-labels`, odpowiednie role | `src/App.tsx`, `src/components/FilterBar.tsx`, `src/components/SearchResults.tsx`, `src/components/dashboard/Sidebar.tsx` | Używane są semantyczne elementy `main`, `section`, `header`, `nav`, `footer`, `fieldset`, `legend` oraz role `search`, `status`, `alert` i `toolbar`. Atrybuty ARIA opisują menu, filtry, wyszukiwarkę, listę zadań, formularze i komunikaty. |
| Kontrast kolorów minimum AA 4,5:1 | `src/theme/colors.js`, `src/theme/createAppTheme.ts` | Kolory tekstu, tła, akcji i stanów są zdefiniowane centralnie. Motyw MUI ma `contrastThreshold: 4.5`, a palety jasna i ciemna używają kontrastowych wartości dla tekstu i przycisków. |
| Nawigacja klawiaturą i widoczny fokus | `src/index.css`, `src/App.tsx`, `src/components/ModalDialog.tsx` | Globalny styl `:focus-visible` dodaje wyraźny obrys dla elementów interaktywnych. Aplikacja ma skip link do głównej treści, a modal MUI obsługuje fokus i zamykanie klawiszem Escape. |
| Pozytywny wynik Lighthouse lub AXE | `lighthouse.png`, `src/lighthouserc.cjs` | W repozytorium znajduje się zrzut audytu Lighthouse z wynikiem Accessibility 95. Konfiguracja Lighthouse CI zawiera próg dostępności min. 0.9. |

## 6. State Management — 4 pkt

| Kryterium | Gdzie w projekcie | Krótki opis |
| --- | --- | --- |
| Globalny stan aplikacji | `src/context/AppContext.tsx`, `src/reducers/todoReducer.ts` | Globalny stan jest obsługiwany przez Context API i `useReducer`. Współdzielone są m.in. lista zadań, motyw, status aplikacji, ładowanie oraz akcje `loadTodos`, `addTodo`, `editTodo`, `toggleTodo`, `deleteTodo`. |
| Obsługa stanów `loading`, `success`, `error` | `src/context/AppContext.tsx`, `src/components/AppStatusSnackbar.tsx`, `src/types/appStatus.types.ts` | Operacje na zadaniach ustawiają statusy aplikacji: ładowanie, sukces lub błąd. `AppStatusSnackbar` pokazuje komunikaty użytkownikowi i używa `CircularProgress` dla stanu ładowania. |

## 7. Integracja z API lub mockiem — 5 pkt

| Kryterium | Gdzie w projekcie | Krótki opis |
| --- | --- | --- |
| Pobieranie i wysyłanie danych | `src/api/todoApiService.ts`, `src/mocks/handlers.ts` | Serwis API wykonuje `GET`, `POST`, `PUT` i `DELETE` na `/api/todos`. Mock MSW obsługuje te metody i zwraca dane z warstwy `todoMockApi`. |
| Alternatywa: mock przez MSW | `src/mocks/browser.ts`, `src/mocks/handlers.ts`, `public/mockServiceWorker.js` | Projekt zawiera konfigurację Mock Service Worker, dzięki czemu aplikacja może działać bez prawdziwego backendu. |
| Widoczna obsługa błędów sieciowych w UI | `src/context/AppContext.tsx`, `src/components/AppStatusSnackbar.tsx`, `src/components/TodoFormPage.tsx` | Błędy pobierania, dodawania, edycji i usuwania zadań są przechwytywane i pokazują komunikaty w snackbarze. Przy edycji nieistniejącego zadania pojawia się widoczny alert. |

## 8. Mikrointerakcje i animacje — 5 pkt

| Kryterium | Gdzie w projekcie | Krótki opis |
| --- | --- | --- |
| Animacje przejść między widokami | `src/components/dashboard/DashboardLayout.tsx`, `src/shared/animations/variants.ts` | Przejścia stron są obsługiwane przez `AnimatePresence`, `motion.div` i warianty `pageVariants`. Dla użytkowników z ograniczeniem ruchu stosowany jest uproszczony wariant `reducedPageVariants`. |
| Wizualny feedback akcji użytkownika | `src/components/AppStatusSnackbar.tsx`, `src/components/loading/LoadingSkeletons.tsx`, `src/components/common/AppButton.tsx` | Użytkownik widzi spinner lub skeleton przy ładowaniu, a po akcjach pojawiają się komunikaty sukcesu i błędu. Przyciski obsługują stan `loading`. |
| Zastosowanie Framer Motion, CSS transitions lub odpowiednika | `package.json`, `src/components/TodoList.tsx`, `src/components/todo/TodoListItem.tsx` | Projekt używa Framer Motion do animacji listy i przejść stron. Elementy listy mają też przejścia CSS dla hovera z uwzględnieniem `prefers-reduced-motion`. |

## 9. Deployment i dokumentacja — 5 pkt

| Kryterium | Gdzie w projekcie | Krótki opis |
| --- | --- | --- |
| Aplikacja wdrożona publicznie | `README.md`, `package.json` | README zawiera link do publicznego demo na GitHub Pages: `https://boryszs.github.io/ZIU_LAB4/#/dashboard`. W `package.json` znajduje się skrypt `deploy` oparty o `gh-pages`. |
| Repozytorium GitHub z historią commitów | `.git`, zdalny adres `https://github.com/Boryszs/ZIU_LAB4.git` | Projekt jest repozytorium Git i ma skonfigurowany zdalny origin na GitHubie. Historia commitów jest dostępna w repozytorium. |
| README z opisem, demo, uruchomieniem i technologiami | `README.md` | README zawiera opis projektu, link do demo, instrukcję instalacji i uruchomienia, komendy, listę technologii, strukturę aplikacji oraz notatkę UX. |

## Opis użytych `aria-label`

| Obszar | Przykładowe `aria-label` | Za co odpowiadają |
| --- | --- | --- |
| Layout i nawigacja | `Układ pulpitu`, `Główna zawartość aplikacji`, `Panel bocznej nawigacji`, `Główna nawigacja`, `Menu mobilne` | Opisują główne regiony aplikacji oraz menu, żeby użytkownik czytnika ekranu wiedział, w jakiej części interfejsu się znajduje. |
| Przyciski ikonowe w nagłówku | `Otwórz menu`, `Zamknij menu`, `Włącz tryb ciemny`, `Włącz tryb jasny`, `Powiadomienia` | Nadają tekstowe znaczenie przyciskom, które wizualnie są reprezentowane tylko ikoną. |
| Dashboard i lista zadań | `Statystyki zadań`, `Lista zadań`, `Dodaj nowe zadanie` | Opisują sekcje z danymi oraz główną akcję dodawania zadania. |
| Akcje pojedynczego zadania | `Oznacz zadanie ... jako ukończone`, `Oznacz zadanie ... jako nieukończone`, `Edytuj zadanie ...`, `Usuń zadanie ...` | Są generowane dynamicznie dla konkretnego zadania, dlatego użytkownik wie, którego elementu dotyczy checkbox, edycja albo usunięcie. |
| Filtry i wyszukiwanie | `Filtr zadań`, `Pokaż lub ukryj filtry zadań`, `Filtry statusu zadań`, `Pokaż ... zadania`, `Filtr priorytetu`, `Wyszukiwarka zadań` | Opisują narzędzia do zawężania listy zadań według tekstu, statusu i priorytetu. |
| Formularze | `Formularz rejestracji`, `Postęp rejestracji`, `Pokaż hasło`, `Ukryj hasło`, `Usuń kategorię ...`, `Podsumowanie danych` | Opisują formularz wieloetapowy, jego postęp oraz przyciski, których znaczenie nie wynika jasno z samego wyglądu. |
| Analityka | `Zgoda na analitykę`, `Status analityki` | Opisują pasek zgody na analitykę i informację o jej wyłączeniu. |

<br><br>


| Atrybut | Do czego służy | Przykład |
|---|---|---|
| `aria-label` | Nadaje opis elementowi, gdy nie ma widocznego tekstu | `aria-label="Dodaj zadanie"` |
| `aria-labelledby` | Łączy element z istniejącym tekstem/nagłówkiem | `aria-labelledby="todo-heading"` |
| `aria-describedby` | Dodaje dodatkowy opis, np. błąd lub pomoc | `aria-describedby="email-error"` |
| `aria-hidden="true"` | Ukrywa element przed czytnikiem ekranu, np. ikonę dekoracyjną | `aria-hidden="true"` |
| `aria-expanded` | Informuje, czy menu/sekcja jest rozwinięta | `aria-expanded={open}` |
| `aria-controls` | Wskazuje element, którym steruje przycisk | `aria-controls="menu-list"` |
| `aria-current="page"` | Oznacza aktualną stronę/link w nawigacji | `aria-current="page"` |
| `aria-checked` | Stan checkboxa/switcha, gdy robisz własny komponent | `aria-checked={checked}` |
| `aria-disabled` | Informuje, że element jest nieaktywny | `aria-disabled="true"` |
| `aria-invalid` | Oznacza pole formularza jako błędne | `aria-invalid={!!error}` |
| `aria-required` | Informuje, że pole jest wymagane | `aria-required="true"` |
| `aria-live` | Ogłasza dynamiczne komunikaty, np. zapisano/usunięto | `aria-live="polite"` |
| `role` | Nadaje semantyczną rolę elementowi, gdy HTML jej nie ma | `role="alert"` |