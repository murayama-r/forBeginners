import { useState, useEffect } from 'react'

export const useCount = () => {
  const [count, setCount] = useState(0)
  const handleIncrement = () => setCount(count + 1)
  const handleDecrement = () => setCount(count - 1)

  return { count, handleIncrement, handleDecrement }
}
