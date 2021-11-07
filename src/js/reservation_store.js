import { writable } from "svelte/store";
import { alertError } from "../js/toast_store";
import dayjs from "dayjs";

export let startDate = writable(null); //선택된 시작시간 객체
export let endDate = writable(null); //선택된 종료시간 객체
export let startTimeValue = writable(null);
export let endTimeValue = writable(null);
export let timeList = writable([]);
export let chooseStimeToggle = writable(true);
export let registedTimeList = writable([]);

export let reservationTimeSelection = writable({
  startDate: null,
  endDate: null,
  startTimeValue: null,
  endTimeValue: null,
  timeList: [],
  chooseStimeToggle: true,
  registedTimeList: [],
});

export function setTime(newSDate, newEDate) {

  reservationTimeSelection.update((selection) => {
    let startDate = selection.startDate;
    let endDate = selection.endDate;
    let timeList = selection.timeList;
    let chooseStimeToggle = selection.chooseStimeToggle;
    let registedTimeList = selection.registedTimeList;

    console.log('before chooseStimeToggle:' + chooseStimeToggle)
    if (newEDate <= startDate) {
      startDate = newSDate;
      endDate = newEDate;
      chooseStimeToggle = false;
    } else if ((startDate === null && endDate === null) || chooseStimeToggle) {
      startDate = newSDate;
      endDate = newEDate;
      chooseStimeToggle = !chooseStimeToggle;
    } else if (!chooseStimeToggle) {
      endDate = newEDate;
      chooseStimeToggle = !chooseStimeToggle;
    }
    console.log('after chooseStimeToggle:' + chooseStimeToggle)

    let newAtimeList = [];

    try {
      newAtimeList = timeList.map((time) => {
        if (time.startDate >= startDate && time.endDate <= endDate) {
          for (let r of registedTimeList) {
            //예약된 시간에 포함된느 칸이 있는지 체크
            if (time.startDate >= r.startTime && time.endDate <= r.endTime) {
              throw new Error(time.startDate + "~" + time.endDate);
            }
          }
          time.state = "CHOOSEN"; //1-2. 선택한 시간 사이에 있는 칸들은 모두 선택된다
        } else {
          if (time.state === "CHOOSEN") {
            //2. 이전에 선택됐던 칸들이 시간 범위 밖에 있다면
            time.state = "NONE"; //2-1. 선택 해제
          }
        }
        return time;
      });
    } catch (e) {
      console.warn("already registed.", e);
      startDate = null;
      endDate = null;
      startTimeValue = null;
      endTimeValue = null;
      newAtimeList = timeList.map((time) => {
        if (time.state === "CHOOSEN") {
          time.state = "NONE";
        }
        return time;
      });
      alertError(3000, "이미 예약된 시간이 포함되어 있습니다.");
    }

    
    console.log({
      startDate: startDate,
      endDate: endDate,
      startTimeValue: dayjs(startDate).format('HH:mm'),
      endTimeValue: dayjs(endDate).format('HH:mm'),
      timeList: newAtimeList,
      chooseStimeToggle: chooseStimeToggle,
      registedTimeList: registedTimeList,
    });
    
    return {
      startDate: startDate,
      endDate: endDate,
      startTimeValue: dayjs(startDate).format('HH:mm'),
      endTimeValue: dayjs(endDate).format('HH:mm'),
      timeList: newAtimeList,
      chooseStimeToggle: chooseStimeToggle,
      registedTimeList: registedTimeList,
    };
  });
}




export function initTime(newSDate, newEDate) {

  reservationTimeSelection.update((selection) => {
    let startDate = selection.startDate;
    let endDate = selection.endDate;
    let timeList = selection.timeList;
    // let chooseStimeToggle = selection.chooseStimeToggle;
    let registedTimeList = selection.registedTimeList;

    startDate = newSDate;
    endDate = newEDate;

    let newAtimeList = [];

    try {
      newAtimeList = timeList.map((time) => {
        if (time.startDate >= startDate && time.endDate <= endDate) {
          for (let r of registedTimeList) {
            //예약된 시간에 포함된느 칸이 있는지 체크
            if (time.startDate >= r.startTime && time.endDate <= r.endTime) {
              throw new Error(time.startDate + "~" + time.endDate);
            }
          }
          time.state = "CHOOSEN"; //1-2. 선택한 시간 사이에 있는 칸들은 모두 선택된다
        } else {
          if (time.state === "CHOOSEN") {
            //2. 이전에 선택됐던 칸들이 시간 범위 밖에 있다면
            time.state = "NONE"; //2-1. 선택 해제
          }
        }
        return time;
      });
    } catch (e) {
      console.warn("already registed.", e);
      startDate = null;
      endDate = null;
      startTimeValue = null;
      endTimeValue = null;
      newAtimeList = timeList.map((time) => {
        if (time.state === "CHOOSEN") {
          time.state = "NONE";
        }
        return time;
      });
      alertError(3000, "이미 예약된 시간이 포함되어 있습니다.");
    }

    
    console.log({
      startDate: startDate,
      endDate: endDate,
      startTimeValue: dayjs(startDate).format('HH:mm'),
      endTimeValue: dayjs(endDate).format('HH:mm'),
      timeList: newAtimeList,
      chooseStimeToggle: chooseStimeToggle,
      registedTimeList: registedTimeList,
    });
    
    return {
      startDate: startDate,
      endDate: endDate,
      startTimeValue: dayjs(startDate).format('HH:mm'),
      endTimeValue: dayjs(endDate).format('HH:mm'),
      timeList: newAtimeList,
      chooseStimeToggle: chooseStimeToggle,
      registedTimeList: registedTimeList,
    };
  });
}