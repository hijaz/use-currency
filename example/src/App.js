import React, {useRef} from 'react'
import { useCurrency } from 'use-currency'

const App = () => {
  const inputRef = useRef();
  const initialValue = "123456";
  const [currency, setCurrency, handleKeyDown] = useCurrency(
    initialValue,
    inputRef
  );


  return (
    <div>
      <input
      type="text"
      ref={inputRef}
      onKeyDown={handleKeyDown}
      onChange={setCurrency}
      value={currency}
    >
      </input>
    </div>
  )
}
export default App
