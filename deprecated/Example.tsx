'use client'
import React, { useMemo, useState, useCallback  } from 'react';

export default function ExampleComponent() {
  const [count, setCount] = useState<number>(0);
  const incrementCount = () => {
      setCount((prev) => prev + 1);
  };

  const incrementCountCallback = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const [otherState, setOtherState] = useState(0);
  const expensiveCalculation = (num: number) => {
    console.log('Calculating...')
    let result = 0;
    for (let i = 0; i < 10000000; i++) {
      result += num;
    }
    return result;
  }

  const memoizedValue = useMemo(() => expensiveCalculation(count), [count])

  return (
    <div>
        {count}
        <p>Memoized Calculation Result: {memoizedValue}</p>
        <button onClick={incrementCount}>Count UP!!</button>
        <button onClick={incrementCountCallback}>Count UP!!</button>
    </div>
    );
}