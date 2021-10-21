import { writable } from "svelte/store";
import config from "./config";

const message = writable({});

const socket = new WebSocket(config.socketURL);

socket.addEventListener("open", (e) => {
  console.log("open socket.");
});

//receive message
socket.addEventListener("message", (e) => {
  message.set(e.data);
});

socket.addEventListener("close", (e) => {
  console.log("close socket.");
});

socket.addEventListener("error", (e) => {
  console.log(e);
});

const sendMessage = (message) => {
  if (socket.readyState <= 1) {
    socket.send(message);
  }
};

export default {
  message: message,
  sendMessage,
};
