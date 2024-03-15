export interface IWeatherData {
  temperature: string;
  [key: string]: unknown;
}

export interface IQueryData {
  lat: number;
  long: number;
  [key: string]: unknown;
}

export interface IForecastData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  [key: string]: unknown;
}
