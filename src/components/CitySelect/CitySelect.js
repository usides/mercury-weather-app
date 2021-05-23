import cities from '../../city_conf';
import { useState, FunctionComponent } from 'react';
import styles from './CitySelect.module.css';
import chevronBottom from './chevron-bottom.png';
import chevronTop from './chevron-top.png';

function CitySelect2({ selectCity }) {
  const [selectedValue, setSelectedValue] = useState('Select city');
  const [openStatus, setOpenStatus] = useState(false);

  const toggleOptions = () => {
    setOpenStatus((state) => (state = !state));
  };

  const handleOptionClick = (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const selected = li.textContent;
    setSelectedValue(selected);
    selectCity(selected);
    toggleOptions();
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
      <div className={setFieldStyle()} onClick={toggleOptions}>
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
          {Object.keys(cities).map((city, index) => {
            if (index === 0) {
              return '';
            } else {
              return (
                <li
                  key={index}
                  value={city}
                  className={styles.options_pane__item}
                >
                  {city}
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}

export default CitySelect2;
