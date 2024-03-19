import React, { useState } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { WeatherContextData } from "../utils/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const UnitConversion = () => {
  const [tabs, setTabs] = useState([
    { name: "Celsius", current: true, value: "metric" },
    { name: "Fahrenheit", current: false, value: "imperial" },
  ]);

  const { setUnit } = React.useContext(WeatherContext) as WeatherContextData;
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs?.find((tab) => tab.current)?.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <p
              key={tab.name}
              className={classNames(
                tab.current
                  ? "bg-gray-200 text-gray-800"
                  : "text-gray-300 hover:text-gray-400",
                "rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
              )}
              onClick={() => {
                const updatedTabs = tabs.map((t, i) => ({
                  ...t,
                  current: i === index,
                }));
                setTabs(updatedTabs);
                setUnit(tab.value);
              }}
            >
              {tab.name}
            </p>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default UnitConversion;
