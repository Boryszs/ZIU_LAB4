import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders dashboard route", async () => {
  render(<App />);

  expect(
    screen.getByRole("main", { name: /główna zawartość aplikacji/i }),
  ).toBeInTheDocument();
  expect(await screen.findByText(/wszystkie zadania/i)).toBeInTheDocument();
});
