import { useContext, useState } from "react";
import Search from "../components/Search";
import { IQueryData } from "../utils/Interface";
import WeatherCard from "../components/WeatherCard";
import Forecast from "../components/Forecast";
import { WeatherContext } from "../context/WeatherContext";
import { WeatherContextData } from "../utils/types";
import Nav from "../components/Nav";
import Loading from "../components/Loading";

const Home = () => {
  const [selectedQuery, setSelectedQuery] = useState<IQueryData | null>(null);
  const { unit, defaultWeatherLoading, defaultForecastLoading } = useContext(
    WeatherContext
  ) as WeatherContextData;

  return (
    <div>
      <Nav />
      {defaultWeatherLoading || defaultForecastLoading ? (
        <Loading
          condition={defaultWeatherLoading || defaultForecastLoading}
          style="bg-[#100e1c] min-h-[calc(100vh-56px)]"
        />
      ) : (
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-0 px-4 py-5 md:px-7 md:py-12 bg-[#100e1c] min-h-[calc(100vh-56px)]">
          <div className="md:w-1/4 p-3 sm:p-5 flex flex-col gap-2 rounded-l-lg rounded-r-lg sm:rounded-r-none shadow-slate-600 shadow bg-[#3f7296]">
            <Search setSelectedQuery={setSelectedQuery} />
            <WeatherCard
              lat={selectedQuery && selectedQuery.lat}
              long={selectedQuery && selectedQuery.lon}
              units={unit}
            />
          </div>

          <div className="md:w-3/4 p-2 sm:p-5 rounded-r-lg rounded-l-lg sm:rounded-l-none shadow-slate-600 shadow bg-[#1e213b]">
            <div>
              <h2 className="text-white font-bold text-xl sm:text-4xl mb-3">
                Forecast
              </h2>
              <Forecast
                lat={selectedQuery && selectedQuery.lat}
                long={selectedQuery && selectedQuery.lon}
                units={unit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
