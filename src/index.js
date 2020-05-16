import { useState, useEffect, useCallback } from 'react';

export function useCurrency(initVal, ref) {
  const [inputVal, setInputVal] = useState(null);
  const [currency, setCurrency] = useState('');

  // set style right to left
  useEffect(() => {
    if (ref) ref.current.style.direction = 'rtl';
  }, [ref]);

  // remove everything except numerics
  const removeNonNumerics = useCallback((raw) =>
    raw ? raw.replace(/[^0-9]/g, '') : ''
  );

  // remove leading zeroes
  const removeLeadingZeroes = useCallback((val) =>
    val ? val.replace(/^0+/, '') : ''
  );

  // initialize
  useEffect(() => {
    setCurrency(formatCurrency(removeNonNumerics(initVal), true));
  }, [initVal]);

  // removeNonNumerics any entered value
  const onChange = useCallback((e) => {
    setInputVal(removeNonNumerics(e.target.value));
  });

  // output formatted currency value
  useEffect(() => {
    if (inputVal !== null) setCurrency(formatCurrency(inputVal));
  }, [inputVal]);

  // format the raw val
  const formatCurrency = useCallback((rawVal, init) => {
    const existingLength = removeLeadingZeroes(removeNonNumerics(currency))
      .length;
    const newLength = removeLeadingZeroes(rawVal).length;

    // check if non num was pressed
    if (existingLength === newLength) return currency || '$0.00';

    // check if a delete happened
    const isDel = existingLength > newLength;

    let newVal = rawVal;

    if (!isDel && !init) {
      // flip entered digit to place it on right side
      const newChar = rawVal.substring(0, 1);
      newVal = rawVal.substring(1, rawVal.length) + newChar;
    }

    newVal = removeLeadingZeroes(newVal);

    // add decimal
    switch (newVal.length) {
      case 0:
        newVal = '0.00';
        break;
      case 1:
        newVal = '0.0' + newVal;
        break;
      case 2:
        newVal = '0.' + newVal;
        break;
      default:
        newVal =
          newVal.substring(0, newVal.length - 2) +
          '.' +
          newVal.substring(newVal.length - 2);
    }

    return Number(newVal).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  });

  // handle detection of delete
  const onKeyDown = useCallback((e) => {
    if (e.keyCode === 8) {
      e.preventDefault();
      const sanitized = removeLeadingZeroes(removeNonNumerics(currency));
      setInputVal(sanitized.substring(0, sanitized.length - 1));
    }

    // keep cursor stickied to right
    setTimeout(() => {
      if (ref.current) ref.current.setSelectionRange(0, 0);
    }, 0);
  });

  return [currency, onChange, onKeyDown];
}
