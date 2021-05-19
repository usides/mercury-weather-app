import cities from '../../city_conf';
import { useState } from 'react';
import styles from './CitySelect.module.css';

const CitySelect = ({ selectCity }) => {
  const [selectedValue, setSelectedValue] = useState('Select city');

  const handleChange = (e) => {
    const selected = e.target.value;
    selectCity(selected);
    setSelectedValue(selected);
  };

  const isFilled = () => {
    if (selectedValue !== 'Select city') return true;
    return false;
  };

  return (
    <div className={styles.custom_select}>
      <select
        className={
          isFilled()
            ? `${styles.custom_select__select} ${styles.custom_select__select___filled}`
            : styles.custom_select__select
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
    </div>
  );
};

export default CitySelect;
