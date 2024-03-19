import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { WeatherContext } from "../context/WeatherContext";
import { WeatherContextData } from "../utils/types";
import { toast } from "react-toastify";
import { IQueryData, ISearchProps } from "../utils/Interface";
import { useDebounce } from "../helpers/debounce";
import Skeleton from "react-loading-skeleton";
import { AxiosError } from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Search(props: ISearchProps) {
  const [query, setQuery] = useState("");
  const [queryResponse, setQueryResponse] = useState<IQueryData[]>([]);
  const [geoLoading, setGeoLoading] = useState(false);
  const { selectedQuery, setSelectedQuery } = props;
  const { fetchGeo } = React.useContext(WeatherContext) as WeatherContextData;

  const debouncedSearch = useDebounce(query, 500);

  const handleSearch = useCallback(
    async (q: string) => {
      setQueryResponse([]);
      if (!q) {
        setQueryResponse([]);
        return;
      }

      setGeoLoading(true);

      try {
        const data = await fetchGeo(q.trim());
        setQueryResponse(data as IQueryData[]);
      } catch (error: unknown) {
        setQueryResponse([]);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error("An unknown error occurred.");
        }
      } finally {
        setGeoLoading(false);
      }
    },
    [fetchGeo]
  );

  useEffect(() => {
    if (debouncedSearch) {
      setQuery(debouncedSearch);
      handleSearch(debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <Combobox as="div" value={selectedQuery} onChange={setSelectedQuery}>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-slate-300 sm:text-sm sm:leading-6"
          onChange={(event) => {
            setQuery(event.target.value.trim());
            setQueryResponse([]);
          }}
          defaultValue={selectedQuery?.name}
          placeholder="City, country. E.g Lagos, NG"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <MagnifyingGlassIcon
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

        {geoLoading ? (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <Skeleton height="2rem" />
          </Combobox.Options>
        ) : queryResponse?.length > 0 ? (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {queryResponse.map((filtered, index) => (
              <Combobox.Option
                key={index}
                value={filtered}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-slate-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected ? "font-semibold" : ""
                      )}
                    >
                      {filtered.name}, {filtered.state}
                    </span>
                    {/* 
                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )} */}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        ) : (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <Combobox.Option
              value={""}
              className={classNames(
                "relative cursor-default select-none py-3 pl-3 pr-9 text-gray-900 text-center"
              )}
            >
              <span>Nothing to show</span>
            </Combobox.Option>
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
