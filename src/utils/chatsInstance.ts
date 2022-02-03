import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
});

const authToken = localStorage.getItem("appAuthToken") || "";
if (authToken) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
}
export default instance;
