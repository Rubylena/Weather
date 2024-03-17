export interface IWeatherData {
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}

export interface IForecastData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  visibility: number;
  dt_txt: string;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}

export interface IQueryData {
  lat: number;
  lon: number;
  name: string;
  state: string;
  country: string;
}

export interface ISearchProps {
  selectedQuery: IQueryData | null;
  setSelectedQuery: React.Dispatch<React.SetStateAction<IQueryData | null>>;
}

export interface ICoordProps {
  lat?: number | null;
  long?: number | null;
  units?: string;
}
