import cities from '../../city_conf';
import { useState } from 'react';
import styles from './CitySelect.module.css';

const CitySelect = ({ selectCityForForecast }) => {
  const [selectedValue, setSelectedValue] = useState('Select city');

  const handleChange = (e) => {
    const selected = e.target.value;
    selectCityForForecast(selected);
    setSelectedValue(selected);
  };

  const isFilled = () => {
    if (selectedValue !== 'Select city') return true;
    return false;
  };

  return (
    <select
      className={
        isFilled() ? `${styles.select} ${styles.select_filled}` : styles.select
      }
      name=''
      id=''
      onChange={handleChange}
      value={selectedValue}
    >
      <option style={{ display: `none` }} disabled>
        Select city
      </option>
      {Object.keys(cities).map((city, index) => (
        <option key={index} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
};

export default CitySelect;
