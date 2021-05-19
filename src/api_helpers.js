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

function tempInCelsius(tempK) {
  const temp = Math.round(tempK - 273.15);
  const sign = temp > 0 ? '+' : '';
  return `${sign}${temp}˚`;
}

const getIconLink = (iconCode) =>
  `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

function adaptWeatherData({ dt, temp, weather: [{ icon }], temp: { day } }) {
  const obj = { icon: getIconLink(icon), date: getWeatherFormattedDate(dt) };
  if (day) {
    obj.temp = tempInCelsius(day);
  } else {
    obj.temp = tempInCelsius(temp);
  }
  return obj;
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
  const data = await response.json().then((d) => d.hourly[12]);
  console.log(data);
  return adaptWeatherData(data);
};
