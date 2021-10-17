import { writable } from "svelte/store";

export let pathname = writable(window.location.pathname);