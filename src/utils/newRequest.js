import axios from "axios";

export const newRequest = axios.create({
  baseURL: "https://dummyapi.io/data/v1/",
  headers: {
    "app-id": "6597ef863d2aa2b0e04fd7ab",
    "Content-Type": "application/json",
  },
});
