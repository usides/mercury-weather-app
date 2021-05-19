import { useState, useEffect } from 'react';
import {
  getSevenDaysForecastFromApi,
  getGoneDayWeatherFromApi,
} from './api_helpers';
import Pane from './components/Pane/Pane';
import CitySelect from './components/CitySelect/CitySelect';
import CardsRow from './components/CardsRow/CardsRow';
import DateSelect from './components/DateSelect/DateSelect';

function App() {
  const [sevenDaysForecastCache, setSevenDaysForecastCache] = useState({});
  const [currentForecastData, setCurrentForecastData] = useState({
    days: [],
    head: 0,
  });
  const [forecastToShow, setForecastToShow] = useState([]);
  const [currentGoneDayFields, setCurrentGoneDayFields] = useState({
    dt: '',
    city: '',
  });

  //--------------------------------------------------

  const selectCityForForecast = async (city) => {
    const forecast = await getSevenDaysForecast(city);
    setCurrentForecastData({ days: forecast, head: 0 });
  };

  const getSevenDaysForecast = async (city) => {
    if (sevenDaysForecastCache.hasOwnProperty(city)) {
      return sevenDaysForecastCache[city];
    } else {
      const apiData = await getSevenDaysForecastFromApi(city);
      setSevenDaysForecastCache((sevenDaysForecastCache) => ({
        ...sevenDaysForecastCache,
        [city]: apiData,
      }));
      return apiData;
    }
  };

  const changeForecastToShow = (direction) => {
    if (direction === 'right') {
      if (currentForecastData.head + 3 === currentForecastData.days.length)
        return;
      setCurrentForecastData((state) => ({ ...state, head: state.head + 1 }));
    } else if (direction === 'left') {
      if (currentForecastData.head === 0) return;
      setCurrentForecastData((state) => ({
        ...state,
        head: state.head + -1,
      }));
    }
  };

  useEffect(() => {
    const { days, head } = currentForecastData;
    const daysToShow = days.slice(head, head + 3);
    setForecastToShow(daysToShow);
  }, [currentForecastData]);

  //--------------------------------------------------------

  const selectGoneDayCity = (city) => {
    setCurrentGoneDayFields((state) => ({ ...state, city }));
  };

  const selectGoneDayDate = (dt) => {
    setCurrentGoneDayFields((state) => ({ ...state, dt }));
  };

  useEffect(() => {
    const { dt, city } = currentGoneDayFields;
    if (dt && city) {
      getGoneDayWeather(city, dt);
    }
  }, [currentGoneDayFields]);

  const getGoneDayWeather = async (city, dt) => {
    const data = await getGoneDayWeatherFromApi(city, dt);
    console.log(data);
  };

  return (
    <div className='App'>
      <header className='header'>
        <h1 className='heading'>
          <span className='heading__left'>Weather</span>
          <span className='heading__right'>forecast</span>
        </h1>
      </header>
      <main className='main_section'>
        <Pane
          isPlaceholder={!Boolean(forecastToShow.length)}
          headerText='7 Days Forecast'
        >
          <form>
            <CitySelect selectCity={selectCityForForecast} />
          </form>
          {Boolean(forecastToShow.length) && (
            <CardsRow
              cardsData={forecastToShow}
              changeForecastToShow={changeForecastToShow}
            />
          )}
        </Pane>
        <Pane isPlaceholder='true' headerText='Forecast for a Date in the Past'>
          <form className='form'>
            <CitySelect selectCity={selectGoneDayCity} />
            <DateSelect selectDate={selectGoneDayDate} />
          </form>
        </Pane>
      </main>
      <footer className='footer'>
        <p className='footer__text'>C ЛЮБОВЬЮ ОТ MERCURY DEVELOPMENT</p>
      </footer>
    </div>
  );
}

export default App;
