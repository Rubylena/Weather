import { useState } from "react";
import Search from "../components/Search";
import { IQueryData } from "../utils/Interface";
import WeatherCard from "../components/WeatherCard";
import Forecast from "../components/Forecast";

const Home = () => {
  const [selectedQuery, setSelectedQuery] = useState<IQueryData | null>(null);
  const [units, setUnits] = useState<string>("metric");

  return (
    <div className="flex flex-col gap-10 p-10">
      <Search
        selectedQuery={selectedQuery}
        setSelectedQuery={setSelectedQuery}
      />
      {/* use tailwind tab here, maybe just beside search or under search */}
      <div>
        <p onClick={()=> setUnits('metric')}>Celsius</p>
        <p onClick={()=> setUnits('imperial')}>Fahrenheit</p>
      </div>

      <WeatherCard
        lat={selectedQuery && selectedQuery.lat}
        long={selectedQuery && selectedQuery.lon}
        units={units}
      />

      <Forecast
        lat={selectedQuery && selectedQuery.lat}
        long={selectedQuery && selectedQuery.lon}
      />
    </div>
  );
};

export default Home;
