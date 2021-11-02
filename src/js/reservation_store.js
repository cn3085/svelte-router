import { writable } from "svelte/store";
import dayjs from "dayjs";
import { formatting } from "./util/TimeUtil";
import { alertError } from "../js/toast_store";

export let startDate = writable(null);
export let endDate = writable(null);
export let timeList = writable([]);
export let chooseStimeToggle = writable(true);
export let registedTimeList = writable([]);

export let reservationTimeSelection = writable({
  startDate: null,
  endDate: null,
  timeList: [],
  chooseStimeToggle: true,
});

export function setTime(newSDate, newEDate) {
  reservationTimeSelection.update((selection) => {
    let startDate = selection.startDate;
    let endDate = selection.endDate;
    let timeList = selection.timeList;
    let chooseStimeToggle = selection.chooseStimeToggle;

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

    let newAtimeList = [];

    try {
      newAtimeList = timeList.map((time) => {
        if (time.startDate >= startDate && time.endDate <= endDate) {
          //1. 시간 범위 안에 있는 칸들
          if (time.state === "FULL") {
            //1-1. FULL인 칸을 포함하면 안 된다
            throw new Error("안돼");
          }
          time.state = "CHOOSEN"; //1-2. 시간 범위 안에 있다면 선택된다
        } else {
          if (time.state === "CHOOSEN") {
            //2. 이전에 선택됐던 칸들이 시간 범위 밖에 있다면
            time.state = "NONE"; //2-1. 선택 해제
          }
        }
        return time;
      });
    } catch (e) {
      console.log(e);
      startDate = null;
      endDate = null;
      newAtimeList = timeList.map((time) => {
        if (time.state === "CHOOSEN") {
          time.state = "NONE";
        }
        return time;
      });
      alertError(3000, "안 돼요");
    }

    return {
      startDate: startDate,
      endDate: endDate,
      timeList: newAtimeList,
      chooseStimeToggle: chooseStimeToggle,
    };
  });
}
