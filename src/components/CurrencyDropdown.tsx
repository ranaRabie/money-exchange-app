import { useEffect, useState } from "react";
import { useFetch } from "../Hooks/useFetch";
import classes from "./CurrencyDropdown.module.scss";

interface CurrencyDropdownProps {
  onCurrencyChange: (curr: string) => void;
  selectedCurrency: string[];
  currentValue: string;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  onCurrencyChange,
  selectedCurrency,
  currentValue,
}) => {
  const [currencyListAPIOptions, setCurrencyListAPIOptions] =
    useState<{} | null>(null);
  const [isLoading, result, error] = useFetch(currencyListAPIOptions);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://currency-exchange.p.rapidapi.com/listquotes",
      headers: {
        "X-RapidAPI-Key": "439cb13217msh7dabbf7dcc12045p173a1ajsnf02493c83036",
        "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
      },
    };
    setCurrencyListAPIOptions(options);
  }, []);

  const onCurrencyChangeHandle = (e: any) => {
    onCurrencyChange(e.target.value);
  };

  return (
    <>
      <select
        onChange={onCurrencyChangeHandle}
        value={currentValue ? currentValue : "default"}
      >
        <option value="default" disabled>
          Select Currency
        </option>
        {result &&
          result.map((curr: string, idx: number) => (
            <option
              key={idx}
              value={curr}
              disabled={true ? selectedCurrency.includes(curr) : false}
              title="currency-option"
            >
              {curr}
            </option>
          ))}
      </select>
      {error && !isLoading && (
        <p className={classes["dropdown-error"]}>Something went wrong</p>
      )}
    </>
  );
};

export default CurrencyDropdown;
