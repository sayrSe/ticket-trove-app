import axios from "axios";

const api = axios.create(
  {
    development: {
      baseURL: "http://localhost:8080",
    },
    qa: {
      baseURL: "https://tickettrove-qa.up.railway.app",
    },
    prod: {
      baseURL: "https://tickettrove-prod.up.railway.app",
    }
  }[process.env.REACT_APP_ENV || "development"]
);
export default api;
