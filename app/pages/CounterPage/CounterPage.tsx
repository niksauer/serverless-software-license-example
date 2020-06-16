import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import routes from '../../constants/routes.json';
import styles from './CounterPage.scss';

export default function CounterPage() {
  const [counter, setCounter] = useState(0);

  const decrement = useCallback(() => setCounter(counter - 1), [counter]);
  const increment = useCallback(() => setCounter(counter + 1), [counter]);

  const incrementAsync = useCallback(() => {
    setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);
  }, [counter]);

  const incrementIfOdd = useCallback(() => {
    if (counter % 2 === 1) {
      setCounter(counter + 1);
    }
  }, [counter]);

  return (
    <div className={styles.counterPage}>
      <div className={styles.backButtonContainer}>
        <Link to={routes.HOME}>
          <FontAwesomeIcon icon="arrow-left" size="3x" />
        </Link>
      </div>
      <div className={styles.counter}>{counter}</div>
      <div className={styles.controls}>
        <button onClick={increment} data-tclass="btn" type="button">
          <FontAwesomeIcon icon="plus" />
        </button>
        <button onClick={decrement} type="button">
          <FontAwesomeIcon icon="minus" />
        </button>
        <button onClick={incrementIfOdd} type="button">
          odd
        </button>
        <button onClick={incrementAsync} type="button">
          async
        </button>
      </div>
    </div>
  );
}
