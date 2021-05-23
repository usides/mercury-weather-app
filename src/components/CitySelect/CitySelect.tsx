import cities from '../../city_conf';
import { useState, FunctionComponent } from 'react';
import styles from './CitySelect.module.css';
import chevronBottom from './chevron-bottom.png';
import chevronTop from './chevron-top.png';

interface CitySelectProps {
  selectCity: Function;
}

const CitySelect: FunctionComponent<CitySelectProps> = ({ selectCity }) => {
  const [selectedValue, setSelectedValue] =
    useState<String | null>('Select city');
  const [openStatus, setOpenStatus] = useState(false);

  const toggleOptions = () => {
    setOpenStatus((state) => (state = !state));
  };

  const handleOptionClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLLIElement;
    const li = target.closest('li');
    if (!li) return;

    setSelectedValue(li.textContent);
    selectCity(li.textContent);
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
};

export default CitySelect;
