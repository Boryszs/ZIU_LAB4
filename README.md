# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Prywatnosc i analityka GA4

Aplikacja korzysta z Google Analytics 4 dopiero po akceptacji banera zgody.
Identyfikator pomiaru nie jest zapisany w kodzie; lokalnie nalezy ustawic
`REACT_APP_GA_MEASUREMENT_ID` w `.env.local`, a w GitHub Actions jako secret
o tej samej nazwie.

Zbierane sa tylko dane niezbedne do oceny uzytecznosci interfejsu:

- `page_view` - sciezka strony, zeby mierzyc najczesciej odwiedzane widoki.
- `cta_click` - nazwa CTA i lokalizacja przycisku, zeby sprawdzic, czy uzytkownicy znajduja kluczowe akcje.
- `form_abandonment` - nazwa formularza i numer kroku, zeby wykryc miejsce porzucenia bez tresci wpisanych w pola.
- `form_submit` - nazwa formularza i status, zeby mierzyc skutecznosc wysylki bez danych osobowych.

Nie sa wysylane: imie, nazwisko, e-mail, haslo, tresc zadania, kategorie ani
inne wartosci wpisywane w formularze. Adres IP jest anonimizowany przez
`anonymize_ip: true`, sygnaly reklamowe GA sa wylaczone, a `app_session_id`
jest losowym UUID trzymanym tylko w `sessionStorage` i nie jest powiazany z
danymi osobowymi. Dane analityczne sluza tylko do statystyk UX, bez
profilowania reklamowego.

W panelu GA4 nalezy ustawic retencje danych na maksymalnie 14 miesiecy.

### Checklist anonimizacji

- IP anonimizowane na poziomie konfiguracji: `anonymize_ip: true`.
- Session ID to losowy UUID w `sessionStorage`, bez powiazania z danymi osobowymi.
- Brak zbierania tresci wpisanych w formularze: hasel, danych osobowych, tresci zadan i kategorii.
- Czas przechowywania danych ograniczony w GA4 do maksymalnie 14 miesiecy.
- Polityka prywatnosci/analityki zaktualizowana o zdarzenia: `page_view`, `cta_click`, `form_abandonment`, `form_submit`.
- Cookie consent zaimplementowany przed inicjalizacja GA4.

### Ocena etyczna / RODO

| Aspekt | Status |
| --- | --- |
| Minimalizacja danych | Zintegrowany z implementacja: wysylane sa tylko metadane zdarzen. |
| Ograniczenie celu | Zintegrowany z implementacja: analityka sluzy tylko do statystyk UX, bez profilowania reklamowego. |
| Integralnosc i poufnosc | Zintegrowany z implementacja: anonimizacja IP, pseudonimowy UUID sesji, brak danych z pol formularzy. |
| Rozliczalnosc | Zintegrowany z dokumentacja: lista zdarzen, cele zbierania i ograniczenia sa opisane w README oraz komentarzu kodu. |
