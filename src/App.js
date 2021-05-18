import { useState } from 'react';
import { getSevenDaysForecastFromApi } from './api_helpers';
import Pane from './components/Pane/Pane';
import CitySelect from './components/CitySelect/CitySelect';
import CardsRow from './components/CardsRow/CardsRow';

function App() {
  const [sevenDaysForecastCache, setSevenDaysForecastCache] = useState({});

  const getSevenDaysForecast = async (city) => {
    if (sevenDaysForecastCache.hasOwnProperty(city)) {
      return sevenDaysForecastCache[city];
    } else {
      const apiData = await getSevenDaysForecastFromApi(city);
      setSevenDaysForecastCache({
        ...sevenDaysForecastCache,
        [city]: apiData,
      });
      return apiData;
    }
  };

  const selectCityForForecast = async (city) => {
    const data = await getSevenDaysForecast(city);
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
      <main className='main-section'>
        <Pane headerText='7 Days Forecast'>
          <form>
            <CitySelect selectCityForForecast={selectCityForForecast} />
          </form>
          <CardsRow />
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
