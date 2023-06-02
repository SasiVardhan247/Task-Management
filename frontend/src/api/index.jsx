import axios from "axios";

const api = axios.create({
  baseURL: 'https://taskmanager-backend-lj93.onrender.com/api',
});

export default api;