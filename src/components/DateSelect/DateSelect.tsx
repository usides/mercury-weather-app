import { useState, FunctionComponent } from 'react'
import styles from './DateSelect.module.css'

interface DateSelectProps {
  selectDate: Function
}

const DateSelect: FunctionComponent<DateSelectProps> = ({ selectDate }) => {
  const [selectedValue, setSelectedValue] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const getDateString = (dateObj: Date) => {
    const year = dateObj.getUTCFullYear()
    const date =
      String(dateObj.getUTCDate()).length > 1
        ? String(dateObj.getUTCDate())
        : '0' + dateObj.getUTCDate()
    const month =
      String(dateObj.getUTCMonth() + 1).length > 1
        ? String(dateObj.getUTCMonth() + 1)
        : '0' + (dateObj.getUTCMonth() + 1)

    return `${year}-${month}-${date}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value
    const selectedDt = e.target.valueAsNumber

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayDtUtc = today.getTime()
    const timeZoneOffsetMs = today.getTimezoneOffset() * 60 * 1000 * -1
    const todayDt = todayDtUtc + timeZoneOffsetMs

    if (selectedDt >= todayDt || selectedDt <= todayDt - 6 * 24 * 3600 * 1000) {
      setShowAlert(true)
    } else {
      setShowAlert(false)
      setSelectedValue(selected)
      selectDate(selectedDt / 1000)
    }
  }

  const isFilled = () => {
    if (selectedValue !== '') return true
    return false
  }

  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() - 1)
  const maxDateString = getDateString(maxDate)

  const minDate = new Date()
  minDate.setDate(minDate.getDate() - 5)
  const minDateString = getDateString(minDate)

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
        max={maxDateString}
        min={minDateString}
      />
      {!isFilled() && (
        <p className={styles.wrapper__input_placeholder}>Select date</p>
      )}
      {showAlert && (
        <p className={styles.wrapper__alert}>
          Please select from the previous five days
        </p>
      )}
    </div>
  )
}

export default DateSelect
