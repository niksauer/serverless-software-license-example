import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Counter.scss';
import routes from '../constants/routes.json';

type Props = {
  increment: () => void;
  incrementIfOdd: () => void;
  incrementAsync: () => void;
  decrement: () => void;
  counter: number;
};

export default function Counter(props: Props) {
  const {
    increment,
    incrementIfOdd,
    incrementAsync,
    decrement,
    counter
  } = props;

  return (
    <div>
      <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <FontAwesomeIcon icon="arrow-left" size="3x" />
        </Link>
      </div>
      <div className={`counter ${styles.counter}`} data-tid="counter">
        {counter}
      </div>
      <div className={styles.btnGroup}>
        <button
          className={styles.btn}
          onClick={increment}
          data-tclass="btn"
          type="button"
        >
          <FontAwesomeIcon icon="plus" />
        </button>
        <button
          className={styles.btn}
          onClick={decrement}
          data-tclass="btn"
          type="button"
        >
          <FontAwesomeIcon icon="minus" />
        </button>
        <button
          className={styles.btn}
          onClick={incrementIfOdd}
          data-tclass="btn"
          type="button"
        >
          odd
        </button>
        <button
          className={styles.btn}
          onClick={() => incrementAsync()}
          data-tclass="btn"
          type="button"
        >
          async
        </button>
      </div>
    </div>
  );
}
