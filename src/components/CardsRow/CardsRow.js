import styles from './CardsRow.module.css';
import WeatherCard from '../WeatherCard/WeatherCard';

const CardsRow = ({ cardsData, changeForecastToShow }) => {
  return (
    <div className={styles.row}>
      <button
        onClick={() => changeForecastToShow('left')}
        className={`${styles.row__arrow} ${styles.row__arrow_left}`}
      ></button>
      {cardsData.map(({ date, icon, temp }) => (
        <WeatherCard key={date} date={date} icon={icon} temp={temp} />
      ))}
      <button
        onClick={() => changeForecastToShow('right')}
        className={`${styles.row__arrow} ${styles.row__arrow_right}`}
      ></button>
    </div>
  );
};

export default CardsRow;
