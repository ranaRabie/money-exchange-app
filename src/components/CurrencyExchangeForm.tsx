import { useRef, useState, useEffect } from "react";
import CurrencyDropdown from "../components/CurrencyDropdown";
import { useFetch } from "../Hooks/useFetch";
import classes from "./CurrencyExchangeForm.module.scss";

interface state {
  from: string;
  to: string;
  q: number | undefined;
}

const CurrencyExchangeForm: React.FC = () => {
  const exchangeForm = useRef<HTMLFormElement | null>(null);
  const amountInput = useRef<HTMLInputElement | null>(null);
  const [amountError, setAmountError] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string[]>([]);
  const [exchnageCalculation, setExchnageCalculation] = useState<string | null>(
    null
  );
  const [formState, setFormState] = useState<state>({
    from: "",
    to: "",
    q: 1.0,
  });
  const [currencyExchangeAPIOptions, setCurrencyExchangeAPIOptions] =
    useState<{} | null>(null);
  const [isLoading, result, error] = useFetch(currencyExchangeAPIOptions);

  /* eslint-disable */
  useEffect(() => {
    setSelectedCurrency([formState.to, formState.from]);

    if (
      formState.q !== undefined &&
      formState.from !== "" &&
      formState.to !== ""
    ) {
      getCurrencyExchangeResult();

      const amount = formState.q ? formState.q : 0;
      const calculatedResult = parseFloat((result * amount).toFixed(2));
      setExchnageCalculation(
        `${amount} ${formState.from}   equals   ${calculatedResult} ${formState.to}`
      );
    }

    return;
  }, [formState, result]);

  const getCurrencyExchangeResult = async () => {
    const options = {
      method: "GET",
      url: "https://currency-exchange.p.rapidapi.com/exchange",
      params: formState,
      headers: {
        "X-RapidAPI-Key": "439cb13217msh7dabbf7dcc12045p173a1ajsnf02493c83036",
        "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
      },
    };

    setCurrencyExchangeAPIOptions(options);
  };

  const amountChangeHandle = () => {
    setFormState((prevState) => ({
      ...prevState,
      q: amountInput.current?.value
        ? parseFloat(amountInput.current?.value)
        : undefined,
    }));
  };

  const fromCurrencyChangeHandle = (curr: string) => {
    setFormState((prevState) => ({
      ...prevState,
      from: curr,
    }));
  };

  const toCurrencyChangeHandle = (curr: string) => {
    setFormState((prevState) => ({
      ...prevState,
      to: curr,
    }));
  };

  const onAmountBlur = () => {
    if (
      amountInput.current?.value === undefined ||
      amountInput.current?.value === ""
    ) {
      setAmountError("Please Insert a valid number");
    }
  };

  const onResetFormHandle = (e: any) => {
    e.preventDefault();
    exchangeForm.current?.reset();
    setFormState({
      from: "",
      to: "",
      q: 1.0,
    });
    setExchnageCalculation(null);
  };

  const onExchangeCurrencyHandle = (e: any) => {
    e.preventDefault();
    console.log("exchange");
    const exchangedTo = formState.from;
    const exchangedFrom = formState.to;
    setFormState((prevState) => ({
      ...prevState,
      from: exchangedFrom,
      to: exchangedTo,
    }));
  };

  return (
    <>
      <form ref={exchangeForm} className={classes["exchange-form"]}>
        <div className={classes["form-body"]}>
          <div>
            <label>Amount</label>
            <input
              type="number"
              ref={amountInput}
              value={formState.q}
              onChange={amountChangeHandle}
              onBlur={onAmountBlur}
              placeholder="0.0"
              step="0.01"
            />
            {amountError && <p>{amountError}</p>}
          </div>
          <div className={classes["currency-inputs"]}>
            <div>
              <label>From</label>
              <CurrencyDropdown
                onCurrencyChange={fromCurrencyChangeHandle}
                selectedCurrency={selectedCurrency}
                currentValue={formState.from}
              />
            </div>
            {exchnageCalculation && (
              <div className={classes["form-exchange"]}>
                <a
                  role="button"
                  title="exchange"
                  onClick={onExchangeCurrencyHandle}
                >
                  <img src="./exchange-icon.svg" />
                </a>
              </div>
            )}
            <div>
              <label>to</label>
              <CurrencyDropdown
                onCurrencyChange={toCurrencyChangeHandle}
                selectedCurrency={selectedCurrency}
                currentValue={formState.to}
              />
            </div>
          </div>
        </div>

        <div className={classes["form-footer"]}>
          {exchnageCalculation && !isLoading && (
            <div className={classes["form-reset"]}>
              <button title="reset" onClick={onResetFormHandle}>
                reset
              </button>
            </div>
          )}

          {isLoading && <p className={classes["form-loading"]}>Loading...</p>}

          {error && (
            <p className={classes["form-error"]}>Something went wrong</p>
          )}

          {exchnageCalculation && !isLoading && (
            <div title="result" className={classes["form-result"]}>
              {exchnageCalculation}
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default CurrencyExchangeForm;
