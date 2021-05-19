import styles from './WeatherCard.module.css';

import React from 'react';

const WeatherCard = ({ date, icon, temp }) => {
  return (
    <div className={styles.card}>
      <p className={styles.card__date}>{date}</p>
      <img className={styles.card__img} src={icon} alt='weather icon' />
      <p className={styles.card__temp}>{temp}</p>
    </div>
  );
};

export default WeatherCard;
