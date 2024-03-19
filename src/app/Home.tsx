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
  const { unit, defaultWeatherLoading, defaultForecastLoading } = useContext(
    WeatherContext
  ) as WeatherContextData;

  return (
    <div>
      <Nav />
      {defaultWeatherLoading || defaultForecastLoading ? (
        <div className="flex items-center justify-center bg-[#100e1c] h-screen xl:h-[calc(100vh-56px)]">
          <svg
            aria-hidden="true"
            className={`h-24 w-24 text-gray-400 ${
              defaultWeatherLoading ? "animate-spin block" : "hidden"
            }  dark:text-gray-600 fill-[#3f7296]`}
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-0 px-4 py-5 md:px-7 md:py-12 bg-[#100e1c] xl:h-[calc(100vh-56px)]">
          <div className="md:w-1/4 p-3 sm:p-5 flex justify-between flex-col rounded-l-lg rounded-r-lg sm:rounded-r-none shadow-slate-600 shadow bg-[#3f7296]">
            <Search setSelectedQuery={setSelectedQuery} />
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
      )}
    </div>
  );
};

export default Home;
