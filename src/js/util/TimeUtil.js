import dayjs from "dayjs";

export function formatting(dateString) {
  return dayjs(dateString).format("YYYY-MM-DD HH:mm:ss");
}

export function getDatetime() {
  return dayjs().format("YYYY-MM-DD HH:mm:ss");
}

export function getDate() {
  return dayjs().format("YYYY-MM-DD");
}

export function getTime() {
  return dayjs().format("HH:mm:ss");
}

export function plusMonth(datetime, month) {
  return dayjs(datetime).add(month, "month").format("YYYY-MM-DD HH:mm:ss");
}

export function plusDay(datetime, day) {
  return dayjs(datetime).add(day, "day").format("YYYY-MM-DD HH:mm:ss");
}

export function plusHour(datetime, hour) {
  return dayjs(datetime).add(hour, "hour").format("YYYY-MM-DD HH:mm:ss");
}

export function plusMinute(datetime, minute) {
  return dayjs(datetime).add(minute, "minute").format("YYYY-MM-DD HH:mm:ss");
}

export function plusSecond(datetime, second) {
  return dayjs(datetime).add(second, "second").format("YYYY-MM-DD HH:mm:ss");
}

export function minusMonth(datetime, month) {
  return dayjs(datetime).subtract(month, "month").format("YYYY-MM-DD HH:mm:ss");
}

export function minusDay(datetime, day) {
  return dayjs(datetime).subtract(day, "day").format("YYYY-MM-DD HH:mm:ss");
}

export function minusHour(datetime, hour) {
  return dayjs(datetime).subtract(hour, "hour").format("YYYY-MM-DD HH:mm:ss");
}

export function minusMinute(datetime, minute) {
  return dayjs(datetime)
    .subtract(minute, "minute")
    .format("YYYY-MM-DD HH:mm:ss");
}

export function minusSecond(datetime, second) {
  return dayjs(datetime)
    .subtract(second, "second")
    .format("YYYY-MM-DD HH:mm:ss");
}
