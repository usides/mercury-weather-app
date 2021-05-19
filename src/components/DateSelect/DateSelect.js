import { useState } from 'react';
import styles from './DateSelect.module.css';

const DateSelect = ({ selectDate }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e) => {
    const selected = e.target.value;
    const selectedDt = e.target.valueAsNumber;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayDtUtc = today.getTime();
    const timeZoneOffsetMs = today.getTimezoneOffset() * 60 * 1000 * -1;
    const todayDt = todayDtUtc + timeZoneOffsetMs;

    if (selectedDt >= todayDt || selectedDt <= todayDt - 7 * 24 * 3600 * 1000)
      return;

    setSelectedValue(selected);
    selectDate(selectedDt / 1000);

    console.log(todayDt);
    console.log(e.target.valueAsNumber);

    console.log(todayDt - e.target.valueAsNumber);
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
