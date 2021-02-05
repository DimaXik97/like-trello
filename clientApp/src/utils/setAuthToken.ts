import axios from "axios";

const setAuthToken = (token: string | null): void => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    localStorage.setItem("jwtToken", token);
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];

    localStorage.removeItem("jwtToken");
  }
};

export const getLocalToken = (): string | null => {
  return localStorage.getItem("jwtToken");
};

export default setAuthToken;
