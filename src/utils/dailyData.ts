import { IDailyWeatherData, IForecastData } from "./Interface";

export const dailyDataExtraction = async (listData: IForecastData[]) => {
  const data: { list: IForecastData[] } = {
    list: listData,
  };

  const dailyData: IDailyWeatherData[] = [];

  const dataByDate: { [date: string]: IForecastData[] } = {};

  for (const item of data.list) {
    const dateStr = item.dt_txt.split(" ")[0];
    const date = new Date(dateStr).toISOString().slice(0, 10);

    if (!dataByDate[date]) {
      dataByDate[date] = [];
    }

    dataByDate[date].push(item);
  }

  for (const date in dataByDate) {
    if (Object.prototype.hasOwnProperty.call(dataByDate, date)) {
      dailyData.push({ date, data: dataByDate[date] });
    }
  }
  return dailyData;
};
