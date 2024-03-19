import { useContext, useState } from "react";
import Search from "../components/Search";
import { IQueryData } from "../utils/Interface";
import WeatherCard from "../components/WeatherCard";
import Forecast from "../components/Forecast";
import { WeatherContext } from "../context/WeatherContext";
import { WeatherContextData } from "../utils/types";
import Nav from "../components/Nav";

const Home = () => {
  const [selectedQuery, setSelectedQuery] = useState<IQueryData | null>(null);
  const { unit } = useContext(WeatherContext) as WeatherContextData;

  return (
    <div className="xl:h-screen xl:overflow-hidden flex flex-col">
      <Nav />
      <div className="flex flex-col sm:flex-row gap-10 sm:gap-0 p-4 md:p-7 bg-[#100e1c] h-full">
        <div className="md:w-1/4 p-3 sm:p-4 flex justify-between flex-col gap-5 rounded-l-lg rounded-r-lg sm:rounded-r-none shadow-slate-600 shadow bg-[#3f7296]">
          <Search
            selectedQuery={selectedQuery}
            setSelectedQuery={setSelectedQuery}
          />
          <WeatherCard
            lat={selectedQuery && selectedQuery.lat}
            long={selectedQuery && selectedQuery.lon}
            units={unit}
          />
        </div>

        <div className="md:w-3/4 p-3 sm:p-5 rounded-r-lg rounded-l-lg sm:rounded-l-none shadow-slate-600 shadow bg-[#1e213b]">
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
    </div>
  );
};

export default Home;
