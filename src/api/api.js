import axios from "axios";

const api = axios.create(
  {
    development: {
      baseURL: "http://localhost:8080",
    },
    qa: {
      baseURL: "tickettrove-qa.up.railway.app",
    },
  }[process.env.REACT_APP_ENV || "development"]
);
export default api;
