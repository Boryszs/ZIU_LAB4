# Todo App - ZIU LAB4

Responsywna aplikacja do zarządzania zadaniami przygotowana w ramach laboratorium ZIU. Projekt zawiera dashboard ze statystykami, listę zadań, formularze dodawania i edycji, globalne stany aplikacji oraz podstawowe rozwiązania dostępnościowe.

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

## Uruchomienie lokalne

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
