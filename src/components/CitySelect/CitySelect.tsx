import cities from '../../city_conf';
import { useState, FunctionComponent, useEffect } from 'react';
import styles from './CitySelect.module.css';
import chevronBottom from './chevron-bottom.png';
import chevronTop from './chevron-top.png';

interface CitySelectProps {
  selectCity: Function;
  changeForecastToShow?: Function;
}

const CitySelect: FunctionComponent<CitySelectProps> = ({
  selectCity,
  changeForecastToShow,
}) => {
  const [selectedValue, setSelectedValue] =
    useState<String | null>('Select city');
  const [openStatus, setOpenStatus] = useState(false);
  const [cityCounter, setCityCounter] = useState(-1);

  const citiesArray = Object.keys(cities).slice(1);

  useEffect(() => {
    if (cityCounter === -1) return;
    setSelectedValue(citiesArray[cityCounter]);
    selectCity(citiesArray[cityCounter]);
  }, [cityCounter]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cityCounter === citiesArray.length - 1) {
        setCityCounter(0);
      } else {
        setCityCounter((state) => (state += 1));
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cityCounter === 0) {
        setCityCounter(citiesArray.length - 1);
      } else {
        setCityCounter((state) => (state -= 1));
      }
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (changeForecastToShow) {
        changeForecastToShow('right');
      }
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (changeForecastToShow) {
        changeForecastToShow('left');
      }
    }
  };

  const toggleOptions = () => {
    setOpenStatus((state) => (state = !state));
  };

  const handleOptionClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLLIElement;
    const li = target.closest('li');
    if (!li) return;
    const value = li.textContent;
    toggleOptions();
    const index = citiesArray.indexOf(value || '', 0);
    setCityCounter(index);
  };

  const setFieldStyle = () => {
    let defaultClass = styles.custom_select__field;
    if (openStatus)
      defaultClass = `${defaultClass} + ${styles.custom_select__field___active}`;
    if (selectedValue !== 'Select city')
      defaultClass = `${defaultClass} + ${styles.custom_select__field___filled}`;
    return defaultClass;
  };

  return (
    <div className={styles.custom_select}>
      <div
        className={setFieldStyle()}
        onClick={toggleOptions}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <p className={styles.field__text_holder}>{selectedValue}</p>
        <img
          className={styles.field__logo}
          src={openStatus ? chevronTop : chevronBottom}
          alt='chevron'
        />
      </div>
      <div
        onClick={handleOptionClick}
        className={
          openStatus
            ? styles.custom_select__options_pane
            : `${styles.custom_select__options_pane} ${styles.custom_select__options_pane___hidden}`
        }
      >
        <ul className={styles.options_pane__list}>
          {citiesArray.map((city, index) => (
            <li
              key={index}
              value={city}
              className={styles.options_pane__item}
              tabIndex={0}
            >
              {city}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CitySelect;
