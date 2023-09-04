import axios from "axios";

const api = axios.create(
  {
    development: {
      baseURL: "https://64edf7ca1f872182714219ea.mockapi.io/api/v1/",
    },
    qa: {
      baseURL: "tickettrove-qa.up.railway.app/",
    },
  }[process.env.REACT_APP_ENV || "development"]
);
export default api;
