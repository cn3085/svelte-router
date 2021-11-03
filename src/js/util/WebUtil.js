export function makeQueryString(searchObject) {
  return Object.entries(searchObject)
    .map((entry) => {
      let [key, value] = entry;
      value = value ?? "";
      return [key, value].join("=");
    })
    .join("&");
}

export function requiredCheck(object) {
  return Object.keys(object).filter(
    (key) =>
      object[key].require &&
      (object[key].value === null ||
        object[key].value === "" ||
        object[key].value === undefined)
  );
}

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}
