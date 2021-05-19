import cities from './city_conf';

function getWeatherFormattedDate(dt) {
  const date = new Date(dt * 1000);
  const formatOptions = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-GB', formatOptions)
    .format(date)
    .toLowerCase();
}

function tempInCelsius(tempF) {
  const temp = Math.round(tempF - 273.15);
  const sign = temp > 0 ? '+' : '';
  return `${sign}${temp}˚`;
}

const getIconLink = (iconCode) =>
  `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

function adaptWeatherData({ dt, temp: { day }, weather: [{ icon }] }) {
  return {
    date: getWeatherFormattedDate(dt),
    temp: tempInCelsius(day),
    icon: getIconLink(icon),
  };
}

export const getSevenDaysForecastFromApi = async (city) => {
  const { lat, lon } = cities[city];
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json().then((d) => d.daily);
  return data.map((day) => adaptWeatherData(day));
};

export const getGoneDayWeatherFromApi = async (city, dt) => {
  const { lat, lon } = cities[city];
  const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
  // .then((d) => d.daily);
  // return data.map((day) => adaptWeatherData(day));
};
