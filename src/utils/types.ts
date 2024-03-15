import { IQueryData, IWeatherData } from "./Interface";

export type WeatherContextData = {
  weather: IWeatherData;
  isLoading: boolean;
  error: null | unknown;
  fetchWeather: () => void;
  fetchForecast: () => void;
  fetchGeo: (q: string) => void;
  queryResponse: IQueryData;
};
