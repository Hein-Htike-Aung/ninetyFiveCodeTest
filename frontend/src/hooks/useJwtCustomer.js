import axios from "axios";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../context/auth_context";

const useJWTCustomer = () => {
  const { customer, logout } = useContext(AuthContext);

  const axiosJWT = axios.create({
    baseURL: "http://localhost:8080/api/v1/",
    headers: {
      authorization: "Bearer " + customer?.access_token,
    },
  });

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();

      const decodedToken = jwt_decode(customer?.access_token);

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        await logout();
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosJWT;
};

export default useJWTCustomer;
