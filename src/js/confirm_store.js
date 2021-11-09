import { writable } from "svelte/store";

export const confirmData = writable({
  message: "",
  confirmThis: null,
  yes: "예",
  no: "아니오",
  isHide: true,
});

export const confirm = (
  message = "",
  confirmThis = null,
  yes = "예",
  no = "아니오"
) => {
  confirmData.update(() => {
    return {
      message: message,
      confirmThis: confirmThis,
      yes: yes,
      no: no,
      isHide: false,
    };
  });
};
