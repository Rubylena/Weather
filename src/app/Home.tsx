import { useState } from "react";
import Search from "../components/Search";
import { IQueryData } from "../utils/Interface";
import WeatherCard from "../components/WeatherCard";

const Home = () => {
  const [selectedQuery, setSelectedQuery] = useState<IQueryData | null>(null);

  return (
    <div className="flex flex-col gap-10">
      <p>Home</p>

      <Search
        selectedQuery={selectedQuery}
        setSelectedQuery={setSelectedQuery}
      />

      <WeatherCard
        lat={selectedQuery && selectedQuery.lat}
        long={selectedQuery && selectedQuery.lon}
      />
    </div>
  );
};

export default Home;
