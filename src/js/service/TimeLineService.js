import { formatting } from "../util/TimeUtil";

export function getFilledTimeArray(startDate, endDate, intervalMinute) {
  let reservationTimeList = [];

  let startDateStep = startDate;
  let endDateStep;

  while (startDateStep.diff(endDate) < 0) {
    endDateStep = startDateStep.add(intervalMinute, "minute");

    reservationTimeList.push({
      state: "NONE",
      startDate: formatting(startDateStep), //2021-10-31 08:00:00
      endDate: formatting(endDateStep),
    });

    startDateStep = endDateStep;
  }

  return reservationTimeList;
}
