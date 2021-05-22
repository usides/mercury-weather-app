import { useState, useRef } from 'react';
import styles from './DateSelect.module.css';

const DateSelect = ({ selectDate }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const dateInput = useRef(null);

  const getDateString = (dateObj) => {
    let year = dateObj.getUTCFullYear();
    let date =
      String(dateObj.getUTCDate()).length > 1
        ? String(dateObj.getUTCDate())
        : '0' + dateObj.getUTCDate();
    let month =
      String(dateObj.getUTCMonth() + 1).length > 1
        ? String(dateObj.getUTCMonth() + 1)
        : '0' + (dateObj.getUTCMonth() + 1);

    return `${year}-${month}-${date}`;
  };

  const handleChange = (e) => {
    const selected = e.target.value;
    const selectedDt = e.target.valueAsNumber;
    console.log(e.target.value);

    const today = new Date();
    console.log(getDateString(today));

    setSelectedValue(selected);
    selectDate(selectedDt / 1000);
  };

  const isFilled = () => {
    if (selectedValue !== '') return true;
    return false;
  };

  let maxDate = new Date();
  maxDate.setDate(maxDate.getDate() - 1);
  maxDate = getDateString(maxDate);

  let minDate = new Date();
  minDate.setDate(minDate.getDate() - 5);
  minDate = getDateString(minDate);

  return (
    <div className={styles.wrapper}>
      <input
        ref={dateInput}
        type='date'
        className={
          isFilled()
            ? `${styles.wrapper__input} ${styles.wrapper__input___filled}`
            : styles.wrapper__input
        }
        onChange={handleChange}
        value={selectedValue}
        max={maxDate}
        min={minDate}
      />
      {!isFilled() && (
        <p
          className={styles.wrapper__input_placeholder}
          onClick={() => dateInput.current.click()}
        >
          Select date
        </p>
      )}
    </div>
  );
};

export default DateSelect;
