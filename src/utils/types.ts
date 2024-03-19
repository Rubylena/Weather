import { IForecastData, IQueryData, IWeatherData } from "./Interface";

export type WeatherContextData = {
  defaultWeatherLoading: boolean;
  weather: IWeatherData | null;
  setWeather: React.Dispatch<React.SetStateAction<IWeatherData | null>>;
  defaultForecastLoading: boolean;
  forecast: IForecastData[] | undefined;
  setForecast: React.Dispatch<
    React.SetStateAction<IForecastData[] | undefined>
  >;
  unit: string;
  setUnit: React.Dispatch<React.SetStateAction<string>>;
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
