import styles from './CardsRow.module.css'
import WeatherCard from '../WeatherCard/WeatherCard'
import { FunctionComponent } from 'react'

interface CardsRowProps {
  cardsData: any[]
  changeForecastToShow: Function
}

const CardsRow: FunctionComponent<CardsRowProps> = ({
  cardsData,
  changeForecastToShow
}) => {
  return (
    <div className={styles.row}>
      <button
        onClick={() => changeForecastToShow('left')}
        className={`${styles.row__arrow} ${styles.row__arrow_left}`}
      />
      {cardsData.map(({ date, icon, temp }) => (
        <WeatherCard key={date} date={date} icon={icon} temp={temp} />
      ))}
      <button
        onClick={() => changeForecastToShow('right')}
        className={`${styles.row__arrow} ${styles.row__arrow_right}`}
      />
    </div>
  )
}

export default CardsRow
