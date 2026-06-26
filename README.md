# Todo App - Projekt

## Opis projektu

Responsywna aplikacja do zarządzania zadaniami przygotowana w ramach laboratorium ZIU. Projekt zawiera dashboard ze statystykami, listę zadań, formularze dodawania i edycji, globalne stany aplikacji oraz podstawowe rozwiązania dostępnościowe.

## Notatka UX

### Grupa docelowa i persona

Aplikacja jest przeznaczona dla osób, które chcą szybko porządkować krótkie zadania: studentów, uczestników zajęć projektowych oraz osób łączących naukę, pracę i codzienne obowiązki. Główny scenariusz użycia zakłada częste, krótkie sesje: sprawdzenie liczby zadań, znalezienie konkretnej pozycji, dodanie nowego zadania, zmianę priorytetu albo oznaczenie zadania jako ukończone.

Przykładowa persona to studentka lub student realizujący kilka równoległych aktywności. Taka osoba korzysta z aplikacji zarówno na laptopie, jak i na telefonie, często w pośpiechu, dlatego potrzebuje interfejsu przewidywalnego, czytelnego i odpornego na pomyłki. Najważniejsze potrzeby tej persony to: szybkie rozpoznanie stanu pracy, łatwe odfiltrowanie zadań, minimum kroków przy dodawaniu zadania oraz jasna informacja zwrotna po wykonaniu akcji.

### Uzasadnienie kluczowych wyborów UI/UX

Pierwszym widokiem aplikacji jest dashboard ze statystykami, ponieważ użytkownik powinien od razu widzieć ogólny stan listy: liczbę wszystkich, ukończonych i oczekujących zadań. Lista zadań została oddzielona od widoku statystyk, aby codzienna praca nie była przeładowana informacjami, ale nadal pozostawała dostępna jednym kliknięciem z głównej nawigacji.

W widoku zadań zastosowano wyszukiwarkę, filtry statusu oraz filtr priorytetu. To wspiera szybkie zawężanie listy, szczególnie wtedy, gdy zadań jest więcej niż kilka. Priorytety są widoczne jako etykiety przy elementach listy, dzięki czemu użytkownik nie musi otwierać szczegółów zadania, aby ocenić jego ważność. Akcje edycji, usunięcia i oznaczenia jako ukończone znajdują się bezpośrednio przy zadaniu, co skraca ścieżkę wykonania najczęstszych operacji.

Formularz dodawania i edycji zawiera tylko pola potrzebne do zapisania zadania: treść oraz priorytet. Przycisk zapisu jest blokowany, gdy treść jest pusta, a komunikat walidacyjny wyjaśnia problem przy polu. W trybie edycji aplikacja ładuje dane zadania i pokazuje stan ładowania, zamiast pozostawiać pusty formularz bez kontekstu. Dostępny jest też przycisk anulowania, który daje użytkownikowi prostą drogę wyjścia bez zapisywania zmian.

Interfejs jest responsywny: na większych ekranach korzysta z bocznej nawigacji, a na mniejszych z układu dostosowanego do telefonu. Zastosowano Material UI, ikony i powtarzalne komponenty przycisków oraz pól formularzy, aby zachować spójność wizualną i przewidywalne zachowanie. Tryb jasny i ciemny poprawia komfort korzystania w różnych warunkach, a animacje respektują preferencje ograniczonego ruchu.

Ważnym elementem UX jest również dostępność. Aplikacja ma skip link do głównej treści, semantyczne sekcje, etykiety ARIA, widoczny fokus, komunikaty statusu dla wyszukiwarki oraz obsługę fokusu w oknie modalnym. Zgoda na analitykę jest jawna i opcjonalna, a aplikacja komunikuje, że nie wysyła treści zadań ani danych osobowych.

### Odniesienie do heurystyk Nielsena i zasad UCD

Projekt wspiera heurystykę widoczności stanu systemu przez statystyki na dashboardzie, licznik aktywnych zadań, szkielety ładowania oraz komunikaty sukcesu i błędu. Zgodność z rzeczywistym językiem użytkownika widać w prostych pojęciach: zadania, priorytet, ukończone, oczekujące. Kontrola i wolność użytkownika są realizowane przez anulowanie formularza, edycję, usuwanie, przełączanie statusu zadania oraz możliwość odrzucenia analityki.

Spójność i standardy zapewnia użycie znanych wzorców: boczna nawigacja, przyciski ikonowe, pole wyszukiwania, etykiety priorytetów i modal oparty na komponencie dialogowym. Zapobieganie błędom pojawia się w walidacji formularza i blokowaniu zapisu pustego zadania. Rozpoznawanie zamiast przypominania wspierają widoczne filtry, chipy priorytetów i statystyki. Elastyczność i efektywność obsługi zapewnia wyszukiwarka, filtry oraz pływający przycisk dodawania zadania.

Z perspektywy UCD decyzje projektowe wynikają z obserwacji typowego przepływu użytkownika: najpierw chce on zorientować się w stanie obowiązków, potem znaleźć lub dodać konkretne zadanie, a na końcu szybko potwierdzić wykonanie pracy. Dlatego aplikacja ogranicza liczbę pól w formularzu, utrzymuje najczęstsze akcje blisko zadania i pokazuje informacje zwrotne w miejscu, w którym użytkownik ich oczekuje.

## Demo

Aplikacja jest dostępna pod adresem:

[https://boryszs.github.io/ZIU_LAB4/#/dashboard](https://boryszs.github.io/ZIU_LAB4/#/dashboard)

## Co potrafi aplikacja

- wyświetla dashboard ze statystykami zadań
- pozwala dodawać, edytować i usuwać zadania
- umożliwia oznaczanie zadań jako ukończone
- obsługuje priorytety zadań
- pozwala filtrować i wyszukiwać zadania
- pokazuje globalne stany `loading`, `success` i `error`
- wspiera tryb jasny i ciemny
- zawiera elementy dostępności: skip link, widoczny fokus, semantyczne elementy HTML i komunikaty ARIA
- wykorzystuje animacje z uwzględnieniem preferencji ograniczonego ruchu

## Instrukcja uruchomienia

Wymagania:

- Node.js
- npm

Instalacja zależności:

```bash
npm install
```

Uruchomienie aplikacji:

```bash
npm start
```

Po uruchomieniu aplikacja będzie dostępna lokalnie pod adresem:

```txt
http://localhost:3000
```

## Budowanie

Aby przygotować produkcyjną wersję aplikacji, uruchom:

```bash
npm run build
```

Gotowe pliki statyczne zostaną zapisane w katalogu:

```txt
build/
```

Ten katalog jest używany przy wdrożeniu aplikacji na GitHub Pages.

Podgląd produkcyjnego buildu lokalnie:

```bash
npx serve -s build
```

## Przydatne komendy

| Komenda | Opis |
| --- | --- |
| `npm install` | instaluje zależności projektu |
| `npm start` | uruchamia aplikację lokalnie |
| `npm test -- --watchAll=false` | uruchamia testy jednorazowo |
| `npm run build` | tworzy produkcyjny build w katalogu `build/` |
| `npm run deploy` | wdraża aplikację na GitHub Pages |

## Użyte technologie

- React 19
- TypeScript
- Create React App / react-scripts
- React Router DOM z `HashRouter`
- Context API i `useReducer`
- Material UI
- Emotion
- React Hook Form
- Zod
- Framer Motion
- React GA4
- Web Vitals
- Lighthouse CI
- GitHub Pages

## Struktura aplikacji

Najważniejsze elementy projektu:

- `src/App.tsx` - konfiguracja tras aplikacji
- `src/context/TodoContext.tsx` - globalny stan aplikacji i obsługa akcji zadań
- `src/components/TodoApp.tsx` - główny widok listy zadań
- `src/components/TodoFormPage.tsx` - widok dodawania i edycji zadania
- `src/components/dashboard/` - layout, header, sidebar i statystyki
- `src/hooks/usePageTitle.ts` - ustawianie tytułu aktualnej strony w headerze

## Analityka i prywatność

Aplikacja może korzystać z Google Analytics 4 dopiero po zaakceptowaniu zgody przez użytkownika. Identyfikator pomiaru należy ustawić w zmiennej środowiskowej:

```txt
REACT_APP_GA_MEASUREMENT_ID
```

Lokalnie można dodać ją w pliku `.env.local`.

Do GA4 wysyłane są wyłącznie metadane zdarzeń. Aplikacja nie wysyła treści wpisywanych w formularze, danych osobowych, haseł ani treści zadań.
