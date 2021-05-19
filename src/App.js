import { useState, useEffect } from 'react';
import { getSevenDaysForecastFromApi } from './api_helpers';
import Pane from './components/Pane/Pane';
import CitySelect from './components/CitySelect/CitySelect';
import CardsRow from './components/CardsRow/CardsRow';

function App() {
  const [sevenDaysForecastCache, setSevenDaysForecastCache] = useState({});
  const [currentForecastData, setCurrentForecastData] = useState({
    days: [],
    head: 0,
  });
  const [forecastToShow, setForecastToShow] = useState([]);

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

  useEffect(() => {
    const { days, head } = currentForecastData;
    const daysToShow = days.slice(head, head + 3);
    setForecastToShow(daysToShow);
  }, [currentForecastData]);

  const selectCityForForecast = async (city) => {
    const forecast = await getSevenDaysForecast(city);
    setCurrentForecastData({ days: forecast, head: 0 });
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

  return (
    <div className='App'>
      <header className='header'>
        <h1 className='heading'>
          <span className='heading__left'>Weather</span>
          <span className='heading__right'>forecast</span>
        </h1>
      </header>
      <main className='main-section'>
        <Pane
          isPlaceholder={!Boolean(forecastToShow.length)}
          headerText='7 Days Forecast'
        >
          <form>
            <CitySelect selectCityForForecast={selectCityForForecast} />
          </form>
          {Boolean(forecastToShow.length) && (
            <CardsRow
              cardsData={forecastToShow}
              changeForecastToShow={changeForecastToShow}
            />
          )}
        </Pane>
        <Pane headerText='Forecast for a Date in the Past'>
          <form>
            <CitySelect />
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
