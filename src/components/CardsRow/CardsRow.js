import styles from './CardsRow.module.css';
import WeatherCard from '../WeatherCard/WeatherCard';

import React from 'react';

const CardsRow = () => {
  return (
    <div className={styles.row}>
      <button
        className={`${styles.row__arrow} ${styles.row__arrow_left}`}
      ></button>
      <WeatherCard />
      <WeatherCard />
      <WeatherCard />
      <button
        className={`${styles.row__arrow} ${styles.row__arrow_right}`}
      ></button>
    </div>
  );
};

export default CardsRow;
