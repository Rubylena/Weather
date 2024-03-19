// import { IDailyWeatherData, IForecastData } from "./Interface";

// export const dailyDataExtraction = async (listData: IForecastData[]) => {
//   const data: { list: IForecastData[] } = {
//     list: listData,
//   };

//   const dailyData: IDailyWeatherData[] = [];

//   const dataByDate: { [date: string]: IForecastData[] } = {};

//   for (const item of data.list) {
//     const dateStr = item.dt_txt.split(" ")[0];
//     const date = new Date(dateStr).toISOString().slice(0, 10);

//     if (!dataByDate[date]) {
//       dataByDate[date] = [];
//     }

//     dataByDate[date].push(item);
//   }

//   for (const date in dataByDate) {
//     if (Object.prototype.hasOwnProperty.call(dataByDate, date)) {
//       dailyData.push({ date, data: dataByDate[date] });
//     }
//   }
//   return dailyData;
// };

// import { IDailyWeatherData, IForecastData } from "./Interface";

// export const dailyDataExtraction = async (
//   listData: IForecastData[]
// ): Promise<IDailyWeatherData[]> => {
//   const data: { list: IForecastData[] } = {
//     list: listData,
//   };

//   const today = new Date().toISOString().slice(0, 10);

//   const dailyData: IDailyWeatherData[] = [];

//   const dataByDate: { [date: string]: IForecastData[] } = {};

//   for (const item of data.list) {
//     const dateStr = item.dt_txt.split(" ")[0];
//     const date = new Date(dateStr).toISOString().slice(0, 10);

//     if (date !== today) {
//       if (!dataByDate[date]) {
//         dataByDate[date] = [];
//       }

//       dataByDate[date].push(item);
//     }
//   }

//   for (const date in dataByDate) {
//     if (Object.prototype.hasOwnProperty.call(dataByDate, date)) {
//       const dataForDate = dataByDate[date];
//       const firstItem = dataForDate[0];
//       const middleIndex = Math.floor(dataForDate.length / 2);
//       const middleItem = dataForDate[middleIndex];
//       const lastItem = dataForDate[dataForDate.length - 1];
//       dailyData.push({ date, data: [firstItem, middleItem, lastItem] });
//     }
//   }

//   return dailyData;
// };

import { IDailyWeatherData, IForecastData } from "./Interface";

export const dailyDataExtraction = async (listData: IForecastData[]) => {
  const data: { list: IForecastData[] } = {
    list: listData,
  };

  const dailyData: IDailyWeatherData[] = [];

  const today = new Date().toISOString().slice(0, 10); // Get today's date

  const dataByDate: { [date: string]: IForecastData[] } = {};

  for (const item of data.list) {
    const dateStr = item.dt_txt.split(" ")[0];
    const date = new Date(dateStr).toISOString().slice(0, 10);

    if (date !== today) {
      if (!dataByDate[date]) {
        dataByDate[date] = [];
      }

      dataByDate[date].push(item);
    }
  }

  for (const date in dataByDate) {
    if (Object.prototype.hasOwnProperty.call(dataByDate, date)) {
      const dataArray = dataByDate[date];
      if (dataArray.length > 0) {
        const firstItem = dataArray[0];
        const lastItem = dataArray[dataArray.length - 1];
        dailyData.push({ date, data: [firstItem, lastItem] });
      }
    }
  }

  return dailyData;
};
