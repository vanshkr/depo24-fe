import axios from "axios";
import { jwtDecode } from "jwt-decode";
const API = axios.create({ baseURL: import.meta.env.VITE_DOMAIN_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("cloakCode")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("cloakCode")
    )}`;
  }
  return req;
});

export const signInAccount = async (userData) => {
  try {
    const response = await API.post(`/auth/signin`, userData);
    const { token } = response.data;

    localStorage.setItem("cloakCode", token);
    return response;
  } catch (error) {
    throw new Error("Sign in failed. Please try again.");
  }
};

export const signUpAccount = async (userData) => {
  try {
    const response = await API.post(`/auth/signup`, userData);
    const { token } = response.data;

    localStorage.setItem("cloakCode", token);

    return response;
  } catch (error) {
    throw new Error("Sign up failed. Please try again.");
  }
};

export const getAccount = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const userToken = localStorage.getItem("cloakCode");
        const currentUser = jwtDecode(userToken);
        console.log(currentUser);
        resolve(currentUser);
      } catch (err) {
        reject(new Error("Token not present."));
      }
    }, 500);
  });
};
