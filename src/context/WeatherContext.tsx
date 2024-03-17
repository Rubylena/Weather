import React, { createContext, useCallback, useEffect, useState } from "react";
import { IForecastData, IQueryData, IWeatherData } from "../utils/Interface";
import axiosClient, { axiosGeoClient } from "../services/api";
import { WeatherContextData } from "../utils/types";
import { toast } from "react-toastify";

const WeatherContext = createContext<WeatherContextData | null>(null);

const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weather, setWeather] = useState<IWeatherData>({
    weather: [
      {
        id: 0,
        main: "",
        description: "",
        icon: "",
      },
    ],
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
      sea_level: 0,
    },
    visibility: 0,
    wind: {
      speed: 0,
      deg: 0,
      gust: 0,
    },
  });

  const [forecast, setForecast] = useState<IForecastData[]>([
    {
      weather: [
        {
          id: 0,
          main: "",
          description: "",
          icon: "",
        },
      ],
      main: {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        humidity: 0,
      },
      visibility: 0,
      wind: {
        speed: 0,
        deg: 0,
        gust: 0,
      },
      dt_txt: "",
    },
  ]);

  const fetchWeather = async (
    latitude: number,
    longitude: number,
    units: string
  ): Promise<IWeatherData> => {
    try {
      const response = await axiosClient.get("weather", {
        params: {
          lat: latitude,
          lon: longitude,
          units: units,
          appid: import.meta.env.VITE_APP_API_ID,
        },
      });
      return response?.data;
    } catch (error: unknown) {
      console.log("Error getting weather data", error);
      throw error;
    }
  };

  const fetchForecast = async (
    latitude: number,
    longitude: number,
    units: string
  ): Promise<IForecastData[]> => {
    try {
      const response = await axiosClient.get("forecast", {
        params: {
          lat: latitude,
          lon: longitude,
          units: units,
          appid: import.meta.env.VITE_APP_API_ID,
        },
      });
      return response?.data;
    } catch (error: unknown) {
      console.log("Error reading forecast:", error);
      throw error;
    }
  };

  const fetchGeo = async (q: string): Promise<IQueryData[]> => {
    try {
      const response = await axiosGeoClient.get("geo/1.0/direct", {
        params: {
          q,
          appid: import.meta.env.VITE_APP_API_ID,
        },
      });
      return response?.data;
    } catch (error: unknown) {
      console.log("Error convert string to geo-coordinates:", error);
      throw error;
    }
  };

  const defaultLocation = useCallback(async () => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      try {
        const weatherResponse = await fetchWeather(
          position.coords.latitude,
          position.coords.longitude,
          "metric"
        );
        const forecastResponse = await fetchForecast(
          position.coords.latitude,
          position.coords.longitude,
          "metric"
        );
        setWeather(weatherResponse as IWeatherData);
        setForecast(forecastResponse as IForecastData[]);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    });
  }, []);

  useEffect(() => {
    defaultLocation();
  }, [defaultLocation]);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        setWeather,
        forecast,
        setForecast,
        fetchWeather,
        fetchForecast,
        fetchGeo,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherProvider };
