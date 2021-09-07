import axios from "axios";

const api = axios.create({
  baseURL: "https://apiruaslimpas.herokuapp.com",
});

export default api;