import axios from "axios";

const API_URL = "/api/users/";

const register = async (userData) => {
  const resp = await axios.post(API_URL, userData);
  if (resp.data) {
    localStorage.setItem("user", JSON.stringify(resp.data));
  }
  return resp.data;
};

const login = async (userData) => {
  const resp = await axios.post(API_URL + "login", userData);
  if (resp.data) {
    localStorage.setItem("user", JSON.stringify(resp.data));
  }
  return resp.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
