import dayjs from "dayjs";
import { getAxios } from "./AuthAxios";

export async function getSettingData() {
  const request = getAxios();

  const res = await request.get("/v1/settings?");
  const data = res.data;
  if (res.status === 200 && data.code === "SUCC") {
    return data.data;
  } else {
    console.error(res);
    throw new Error(data.message);
  }
}

export function getTodayOperatingTime(settingObject) {
  const dayNumber = dayjs().day();

  let todayOperatingTime = {
    startTime: "00:00",
    endTime: "00:00",
  };

  if (dayNumber === 0) {
    todayOperatingTime.startTime = settingObject.sunDayStart;
    todayOperatingTime.endTime = settingObject.sunDayEnd;
  } else if (dayNumber === 1) {
    todayOperatingTime.startTime = settingObject.monDayStart;
    todayOperatingTime.endTime = settingObject.monDayEnd;
  } else if (dayNumber === 2) {
    todayOperatingTime.startTime = settingObject.tuesDayStart;
    todayOperatingTime.endTime = settingObject.tuesDayEnd;
  } else if (dayNumber === 3) {
    todayOperatingTime.startTime = settingObject.wednesDayStart;
    todayOperatingTime.endTime = settingObject.wednesDayEnd;
  } else if (dayNumber === 4) {
    todayOperatingTime.startTime = settingObject.thursDayStart;
    todayOperatingTime.endTime = settingObject.thursDayEnd;
  } else if (dayNumber === 5) {
    todayOperatingTime.startTime = settingObject.friDayStart;
    todayOperatingTime.endTime = settingObject.friDayEnd;
  } else if (dayNumber === 6) {
    todayOperatingTime.startTime = settingObject.saturDayStart;
    todayOperatingTime.endTime = settingObject.saturDayEnd;
  }

  return todayOperatingTime;
}
