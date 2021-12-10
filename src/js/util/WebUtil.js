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

export function oppositeColor(c){
  let result = '#';
  let ch = '';
  const list1 = '0123456789ABCDEF';
  const list2 = 'FEDCBA9876543210';
  for(let i = 1; i < c.length; i ++){
      ch = c.charAt(i);
      for(let n = 0; n < list1.length; n++){
          if(ch == list1.charAt(n)){
              result += list2.charAt(n);
          }
      }
  }
  return result;
}
