export interface IWeatherData {
  temperature: string;
  [key: string]: unknown;
}

export interface IQueryData {
  lat: number;
  lon: number;
  name: string;
  state: string;
  country: string;
}

export interface IForecastData {
  // main: {
  //   temp: number;
  //   feels_like: number;
  //   temp_min: number;
  //   temp_max: number;
  //   pressure: number;
  //   sea_level: number;
  //   grnd_level: number;
  //   humidity: number;
  //   temp_kf: number;
  // };
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

export interface ISearchProps {
  selectedQuery: IQueryData | null;
  setSelectedQuery: React.Dispatch<React.SetStateAction<IQueryData | null>>;
}

export interface ICoordProps {
  lat?: number | null;
  long?: number | null;
}
