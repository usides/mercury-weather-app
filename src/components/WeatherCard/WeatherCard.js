import styles from './WeatherCard.module.css';

import React from 'react';

const WeatherCard = () => {
  return (
    <div className={styles.card}>
      <p className={styles.card__date}>27 sep 2021</p>
      <img
        className={styles.card__img}
        src='http://openweathermap.org/img/wn/01d@2x.png'
        alt=''
      />
      <p className={styles.card__temp}>+17°</p>
    </div>
  );
};

export default WeatherCard;
