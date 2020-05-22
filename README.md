# use-currency

> react hook to transform a text input to currency input

[![NPM](https://img.shields.io/npm/v/use-currency.svg)](https://www.npmjs.com/package/use-currency) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![](/use-currency.gif)

## Install

```bash
npm install --save use-currency
```

## Usage

```jsx
import React, { useRef } from 'react'
import { useCurrency } from 'use-currency'

const Example = () => {
  const inputRef = useRef()
  const initialValue = "123456"
  const [currency, setCurrency, handleKeyDown] = useCurrency(initialValue, inputRef)

  return (
    <input
      type="text"
      ref={inputRef}
      onKeyDown={handleKeyDown}
      onChange={setCurrency}
      value={currency}
    />
  )
}
```

## License

MIT © [hijaz](https://github.com/hijaz)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
