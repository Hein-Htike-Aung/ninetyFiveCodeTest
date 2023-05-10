import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios_instance";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [librarian, setLibrarian] = useState(
    JSON.parse(localStorage.getItem("librarian") || null)
  );

  const [customer, setCusotmer] = useState(
    JSON.parse(localStorage.getItem("customer") || null)
  );

  useEffect(() => {
    localStorage.setItem("librarian", JSON.stringify(librarian));
  }, [librarian]);

  useEffect(() => {
    localStorage.setItem("customer", JSON.stringify(customer));
  }, [customer]);

  const login = async (payload) => {
    const res = await axiosInstance.post("/auth/librarian_login", payload);

    setLibrarian(res.data.data);
  };

  const customerLogin = async (payload) => {
    const res = await axiosInstance.post("/auth/customer_login", payload);

    setCusotmer(res.data.data);
  };

  const updateCurrentUser = async (payload) => {
    setLibrarian((prev) => ({
      ...prev,
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      gender: payload.gender,
      about: payload.about,
      img: payload.img,
    }));
  };

  const logout = async () => {
    // await axiosInstance.post("/auth/logout");
    setLibrarian(null);
  };

  return (
    <AuthContext.Provider
      value={{
        librarian,
        customer,
        login,
        customerLogin,
        logout,
        updateCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
