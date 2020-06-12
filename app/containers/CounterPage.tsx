import React, { useState } from 'react';
import Counter from '../components/Counter';

const IncrementIfOdd = (counter: number, setCounter: Function) => {
  return () => (counter % 2 === 1 ? setCounter(counter + 1) : '');
};

const IncrementAsync = (counter: number, setCounter: Function) => {
  return () => {
    setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);
  };
};
export default function CounterPage() {
  const [counter, setCounter] = useState(0);
  return (
    <Counter
      counter={counter}
      decrement={() => setCounter(counter - 1)}
      increment={() => setCounter(counter + 1)}
      incrementIfOdd={IncrementIfOdd(counter, setCounter)}
      incrementAsync={IncrementAsync(counter, setCounter)}
    />
  );
}
