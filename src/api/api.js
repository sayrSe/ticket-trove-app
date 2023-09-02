import axios from "axios";

const api = axios.create(
  {
    development: {
      baseURL: "https://64edf4ea1f87218271421348.mockapi.io/api/v1/",
    },
    qa: {
      baseURL: "tickettrove-qa.up.railway.app/",
    },
  }[process.env.REACT_APP_ENV || "development"]
);
export default api;
