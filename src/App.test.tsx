import { render, screen } from "@testing-library/react";
import CurrencyDropdown from "./components/CurrencyDropdown";
import CurrencyExchangeForm from "./components/CurrencyExchangeForm";

describe("currency exchange Endpoints", () => {
  test("currency list", async () => {
    const optionsArr = ["SGD", "MYR", "EUR", "USD"];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(optionsArr),
      })
    ) as jest.Mock;

    render(
      <CurrencyDropdown
        onCurrencyChange={() => {}}
        selectedCurrency={[]}
        currentValue="EGP"
      />
    );

    const currencyOptions = await screen.findAllByTitle("currency-option");
    expect(currencyOptions).not.toHaveLength(0);
  });
});

describe("render components on interaction", () => {
  test("not render reset button at mount", async () => {
    render(<CurrencyExchangeForm />);

    const outputElement = screen.queryByTitle("reset");
    expect(outputElement).toBeNull();
  });

  test("not render exchange button at mount", async () => {
    render(<CurrencyExchangeForm />);

    const outputElement = screen.queryByTitle("exchange");
    expect(outputElement).toBeNull();
  });

  test("not render result mount", async () => {
    render(<CurrencyExchangeForm />);

    const outputElement = screen.queryByTitle("result");
    expect(outputElement).toBeNull();
  });
});
