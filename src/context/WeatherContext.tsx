import React, { createContext, useCallback, useEffect, useState } from "react";
import { IForecastData, IQueryData, IWeatherData } from "../utils/Interface";
import axiosClient, { axiosGeoClient } from "../services/api";
import { WeatherContextData } from "../utils/types";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const WeatherContext = createContext<WeatherContextData | null>(null);

const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weather, setWeather] = useState<IWeatherData | null>(null);
  const [defaultWeatherLoading, setDefaultWeatherLoading] = useState(false);

  const [forecast, setForecast] = useState<IForecastData[] | undefined>();
  const [defaultForecastLoading, setDefaultForecastLoading] = useState(false);

  const [unit, setUnit] = useState<string>("metric");

  const fetchWeather = async (
    latitude: number,
    longitude: number,
    units: string
  ): Promise<IWeatherData> => {
    setDefaultWeatherLoading(true);
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
    } finally {
      setDefaultWeatherLoading(false);
    }
  };

  const fetchForecast = async (
    latitude: number,
    longitude: number,
    units: string
  ): Promise<IForecastData[]> => {
    setDefaultForecastLoading(true);
    try {
      const response = await axiosClient.get("forecast", {
        params: {
          lat: latitude,
          lon: longitude,
          cnt: 20,
          units: units,
          appid: import.meta.env.VITE_APP_API_ID,
        },
      });
      return response?.data?.list;
    } catch (error: unknown) {
      console.log("Error reading forecast:", error);
      throw error;
    } finally {
      setDefaultForecastLoading(false);
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
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const weatherResponse = await fetchWeather(
          position.coords.latitude,
          position.coords.longitude,
          unit
        );
        const forecastResponse = await fetchForecast(
          position.coords.latitude,
          position.coords.longitude,
          unit
        );
        const weatherData = weatherResponse as IWeatherData;
        weatherData.default = true;
        setWeather(weatherData);
        setForecast(forecastResponse as IForecastData[]);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error("An unknown error occurred.");
        }
      }
    });
  }, [unit]);

  useEffect(() => {
    if (weather?.default) {
      defaultLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultLocation, unit]);

  useEffect(() => {
    defaultLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        defaultWeatherLoading,
        weather,
        setWeather,
        defaultForecastLoading,
        forecast,
        unit,
        setUnit,
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
