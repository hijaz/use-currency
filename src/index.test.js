import React, { useRef } from "react";
import { render, fireEvent } from "@testing-library/react";
import { useCurrency } from "./index";

function Wrapper({ init }) {
  const inputRef = useRef();
  const initialValue = init;
  const [currency, setCurrency, handleKeyDown] = useCurrency(
    initialValue,
    inputRef
  );

  return (
    <input
      data-testid="currency-input"
      type="text"
      ref={inputRef}
      onKeyDown={handleKeyDown}
      onChange={setCurrency}
      value={currency}
    ></input>
  );
}

const testVals = {
  "": "$0.00",
  "0": "$0.00",
  "000000001": "$0.01",
  "123456": "$1,234.56",
  "9999999999999": "$99,999,999,999.99",
  "234": "$2.34",
  "1000000000000000000000000001": "$10,000,000,000,000,000,000,000,000.00",
  "87q4365": "$8,743.65",
  ewrwerwer: "$0.00",
};

Object.keys(testVals).forEach((val) => {
  test(`can display init val correctly: ${val}`, () => {
    const { getByTestId, debug } = render(<Wrapper init={val} />);
    const currencyInput = getByTestId("currency-input");
    expect(currencyInput.value).toBe(testVals[val]);
  });
});
