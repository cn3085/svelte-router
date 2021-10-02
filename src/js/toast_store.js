import { writable } from "svelte/store";

export const toasts = writable([]);

const generateId = () => Math.floor(Math.random() * 10000);
const toastJson = (type, title, message, timeout) =>
  new Object({
    id: generateId(),
    timeoutId: -1,
    type: type,
    dismissable: true,
    title: title,
    message: message,
    timeout: timeout,
  });

export const alertInfo = (timeout = 3000, title = "", message = "") => {
  addToast(toastJson("info", title, message, timeout));
};

export const alertError = (timeout = 3000, title = "", message = "") => {
  addToast(toastJson("error", title, message, timeout));
};

export const alertSuccess = (timeout = 3000, title = "", message = "") => {
  addToast(toastJson("success", title, message, timeout));
};

export const addToast = (toast) => {
  const id = setTimeout(() => dismissToast(toast.id), toast.timeout);
  toast.timeoutId = id;
  toasts.update((all) => [{ ...toast }, ...all]);
};

export const dismissToast = (id) => {
  toasts.update((all) => all.filter((t) => t.id !== id));
};
