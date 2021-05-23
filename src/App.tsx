import { useState, useEffect } from 'react';
import {
  getSevenDaysForecastFromApi,
  getGoneDayWeatherFromApi,
} from './api_helpers';
import Pane from './components/Pane/Pane';
import CitySelect from './components/CitySelect/CitySelect';
import CardsRow from './components/CardsRow/CardsRow';
import DateSelect from './components/DateSelect/DateSelect';
import WeatherCard from './components/WeatherCard/WeatherCard';
import { useMediaQuery } from './media_query';
import cities from './city_conf';

interface CurrentForecastData {
  days: Array<Object>;
  head: number;
}

interface SevenDaysForecastCache {
  [key: string]: Array<Object>;
}

interface CurrentGoneDayFields {
  dt: string;
  city: keyof typeof cities;
}

interface GoneDayWeatherCache {
  [key: string]: any;
}

interface CurrentGoneDayWeatherData {
  [key: string]: any;
}

function App() {
  const [sevenDaysForecastCache, setSevenDaysForecastCache] =
    useState<SevenDaysForecastCache>({});
  const [currentForecastData, setCurrentForecastData] =
    useState<CurrentForecastData>({
      days: [],
      head: 0,
    });
  const [forecastToShow, setForecastToShow] = useState<Array<Object>>([]);
  const [currentGoneDayFields, setCurrentGoneDayFields] =
    useState<CurrentGoneDayFields>({
      dt: '',
      city: '',
    });
  const [goneDayWeatherCache, setGoneDayWeatherCache] =
    useState<GoneDayWeatherCache>({});
  const [currentGoneDayWeatherData, setCurrentGoneDayWeatherData] =
    useState<CurrentGoneDayWeatherData>({});

  let isPageShort = useMediaQuery('(max-width: 650px)');
  let gap = isPageShort ? 1 : 3;

  const selectCityForForecast = async (city: keyof typeof cities) => {
    const forecast = await getSevenDaysForecast(city);
    setCurrentForecastData({ days: forecast, head: 0 });
  };

  const getSevenDaysForecast = async (city: keyof typeof cities) => {
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
    if (currentForecastData.days.length === 0) return;
    const { days, head } = currentForecastData;
    const daysToShow = days.slice(head, head + gap);
    setForecastToShow(daysToShow);
  }, [currentForecastData, gap, isPageShort]);

  const changeForecastToShow = (direction: string) => {
    if (forecastToShow.length === 0) return;
    if (direction === 'right') {
      if (currentForecastData.head + gap >= currentForecastData.days.length)
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

  const selectGoneDayCity = (city: keyof typeof cities) => {
    setCurrentGoneDayFields((state) => ({ ...state, city }));
  };

  const selectGoneDayDate = (dt: string) => {
    setCurrentGoneDayFields((state) => ({ ...state, dt }));
  };

  useEffect(() => {
    const { dt, city } = currentGoneDayFields;
    if (dt && city) {
      getGoneDayWeather(city, dt);
    }

    async function getGoneDayWeather(city: keyof typeof cities, dt: string) {
      const cacheKey = `${city}-${dt}`;

      if (goneDayWeatherCache.hasOwnProperty(cacheKey)) {
        setCurrentGoneDayWeatherData(goneDayWeatherCache[cacheKey]);
      } else {
        const apiData = await getGoneDayWeatherFromApi(city, dt);
        setGoneDayWeatherCache((state) => ({
          ...state,
          [cacheKey]: apiData,
        }));
        setCurrentGoneDayWeatherData(apiData);
      }
    }
  }, [currentGoneDayFields]); // eslint-disable-line react-hooks/exhaustive-deps

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
            <CitySelect
              selectCity={selectCityForForecast}
              changeForecastToShow={changeForecastToShow}
            />
          </form>
          {Boolean(forecastToShow.length) && (
            <CardsRow
              cardsData={forecastToShow}
              changeForecastToShow={changeForecastToShow}
            />
          )}
        </Pane>
        <Pane
          isPlaceholder={
            !Boolean(Object.keys(currentGoneDayWeatherData).length)
          }
          headerText='Forecast for a Date in the Past'
        >
          <form className='form'>
            <CitySelect selectCity={selectGoneDayCity} />
            <DateSelect selectDate={selectGoneDayDate} />
          </form>
          {Boolean(Object.keys(currentGoneDayWeatherData).length) && (
            <WeatherCard
              date={currentGoneDayWeatherData.date}
              icon={currentGoneDayWeatherData.icon}
              temp={currentGoneDayWeatherData.temp}
            />
          )}
        </Pane>
      </main>
      <footer className='footer'>
        <p className='footer__text'>
          C ЛЮБОВЬЮ ОТ MERCURY DEVELOPMENT & USIDES
        </p>
      </footer>
    </div>
  );
}

export default App;
