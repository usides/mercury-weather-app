import { useState } from 'react';
import styles from './DateSelect.module.css';

const DateSelect = ({ selectDate }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e) => {
    const selected = e.target.value;
    setSelectedValue(selected);
    selectDate(e.target.valueAsNumber / 1000);
  };

  const isFilled = () => {
    if (selectedValue !== '') return true;
    return false;
  };

  return (
    <input
      type='date'
      className={
        isFilled() ? `${styles.input} ${styles.input___filled}` : styles.input
      }
      onChange={handleChange}
      value={selectedValue}
    />
  );
};

export default DateSelect;
