import React, { useEffect } from "react";
import { useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { WeatherContext } from "../context/WeatherContext";
import { WeatherContextData } from "../utils/types";
import { toast } from "react-toastify";
import { IQueryData } from "../utils/Interface";
import { useDebounce } from "../helpers/debounce";

// const people = [{ id: 1, name: "Leslie Alexander" }];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [queryResponse, setQueryResponse] = useState<IQueryData[]>([]);
  const [geoLoading, setGeoLoading] = useState(false);
  // const [filteredQuery, setFilteredQuery] = useState<IQueryData[]>([]);

  const { fetchGeo } = React.useContext(WeatherContext) as WeatherContextData;

  const debouncedSearch = useDebounce(query, 500);

  //   add search function that calls the fetchGeo function with the location string.
  const handleSearch = async (q: string) => {
    console.log(q);
    if (!q) {
      return;
    }
    setGeoLoading(true);
    try {
      const data = await fetchGeo(q);
      console.log("data", data);
      setQueryResponse(data as IQueryData[]);
      // setQueryResponse(data as IQueryData[]);
    } catch (e: unknown) {
      console.log("error", e);
      toast.error(e?.response.message);
    } finally {
      setGeoLoading(false);
    }
  };

  //   Then display the results of the search in the combobox dropdown options.
  //   when any of the options is selected from the dropdown or enter is selected, first item is used if nothing is selected.
  //   when selected the long and lat from the selected query response is inputted into the weather function.
  //   call the fetchWeather function with the selected lon and lat.
  //    lastly call the fetchForecast function
  const filteredQuery =
    query === ""
      ? queryResponse
      : queryResponse?.filter((response) => {
          return response?.name.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    // Update params with the latest debounced search text
    if (debouncedSearch) {
      console.log("debounced", debouncedSearch);
      setQuery(debouncedSearch);
    }
    if (query) {
      handleSearch(query);
    }
  }, [debouncedSearch, query]);

  // useEffect(() => {
  //   handleSearch(query);
  // }, [query]);
  // useEffect(() => {
  //   // useCallback here
  //   setFilteredQuery(filteredQuerySyntax);
  //   console.log("query response", queryResponse);
  //   console.log("filtered", filteredQuerySyntax);
  // }, [queryResponse, query]);

  return (
    <Combobox as="div" value={selectedQuery} onChange={setSelectedQuery}>
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
        Assigned to
      </Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => {
            setQuery(event.target.value);
            // debouncedSearch(event.target.value);
          }}
          // onBlur={() => debouncedSearch(query)}
          // displayValue={(person) => person?.name}
          displayValue={(name: string) => name}
          // value={query}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <svg
            aria-hidden="true"
            className={`h-5 w-5 text-gray-400 mr-3 ${
              geoLoading ? "animate-spin block" : "hidden"
            }  dark:text-gray-600 fill-blue-600`}
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
        </Combobox.Button>

        {filteredQuery.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredQuery.map((filtered, index) => (
              <Combobox.Option
                key={index}
                value={filtered.name}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected ? "font-semibold" : ""
                      )}
                    >
                      {filtered.name}, {filtered.state}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
