import cities from './city_conf';

function getWeatherFormattedDate(dt: string) {
  const date = new Date(Number(dt) * 1000);

  return new Intl.DateTimeFormat('en-GB', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  })
    .format(date)
    .toLowerCase();
}

function tempInCelsius(tempK: string) {
  const temp = Math.round(Number(tempK) - 273.15);
  const sign = temp > 0 ? '+' : '';
  return `${sign}${temp}˚`;
}

const getIconLink = (iconCode: string) =>
  `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

interface AdaptWeatherData {
  dt: string;
  temp: any;
  weather: any[];
}

function adaptWeatherData({
  dt,
  temp,
  weather: [{ icon }],
  temp: { day },
}: AdaptWeatherData) {
  const obj = {
    icon: getIconLink(icon),
    date: getWeatherFormattedDate(dt),
    temp,
  };
  if (day) {
    obj.temp = tempInCelsius(day);
  } else {
    obj.temp = tempInCelsius(temp);
  }
  return obj;
}

export const getSevenDaysForecastFromApi = async (
  city: keyof typeof cities,
) => {
  const { lat, lon } = cities[city];
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json().then((d) => d.daily);
  return data.map((day: any) => adaptWeatherData(day));
};

export const getGoneDayWeatherFromApi = async (
  city: keyof typeof cities,
  dt: string,
) => {
  const { lat, lon } = cities[city];
  const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json().then((d) => d.hourly[12]);
  return adaptWeatherData(data);
};
