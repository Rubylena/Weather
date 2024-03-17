import { IForecastData, IQueryData, IWeatherData } from "./Interface";

export type WeatherContextData = {
  weather: IWeatherData;
  setWeather: React.Dispatch<React.SetStateAction<IWeatherData>>;
  forecast: IForecastData[];
  setForecast: React.Dispatch<React.SetStateAction<IForecastData[]>>;
  fetchWeather: (
    latitude: number,
    longitude: number,
    units: string
  ) => Promise<IWeatherData>;
  fetchForecast: (
    latitude: number,
    longitude: number,
    units: string
  ) => Promise<IForecastData[]>;
  fetchGeo: (q: string) => Promise<IQueryData[]>;
};
