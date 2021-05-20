import { useState } from 'react';
import styles from './DateSelect.module.css';

const DateSelect = ({ selectDate }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const selected = e.target.value;
    const selectedDt = e.target.valueAsNumber;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayDtUtc = today.getTime();
    const timeZoneOffsetMs = today.getTimezoneOffset() * 60 * 1000 * -1;
    const todayDt = todayDtUtc + timeZoneOffsetMs;

    if (selectedDt >= todayDt || selectedDt <= todayDt - 7 * 24 * 3600 * 1000) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      setSelectedValue(selected);
      selectDate(selectedDt / 1000);
    }

    // console.log(todayDt);
    // console.log(e.target.valueAsNumber);
    // console.log(todayDt - e.target.valueAsNumber);
  };

  const isFilled = () => {
    if (selectedValue !== '') return true;
    return false;
  };

  return (
    <div className={styles.wrapper}>
      <input
        type='date'
        className={
          isFilled()
            ? `${styles.wrapper__input} ${styles.wrapper__input___filled}`
            : styles.wrapper__input
        }
        onChange={handleChange}
        value={selectedValue}
      />
      {showAlert && (
        <p className={styles.wrapper__alert}>
          Please select from the previous five days
        </p>
      )}
    </div>
  );
};

export default DateSelect;
