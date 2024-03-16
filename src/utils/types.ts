import { AxiosError } from "axios";
import { IForecastData, IQueryData, IWeatherData } from "./Interface";

export type WeatherContextData = {
  weather: IWeatherData;
  setWeather: React.Dispatch<React.SetStateAction<IWeatherData>>;
  forecast: IForecastData[];
  setForecast: React.Dispatch<React.SetStateAction<IForecastData[]>>;
  fetchWeather: (
    latitude: number,
    longitude: number
  ) => Promise<IWeatherData | AxiosError>;
  fetchForecast: (
    latitude: number,
    longitude: number,
    cnt: number
  ) => Promise<IForecastData[] | AxiosError>;
  fetchGeo: (q: string) => Promise<IQueryData[] | AxiosError>;
};
