import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUserOnLoad();
  }, []);

  const getUserOnLoad = async () => {
    try {
      const accountDetail = await account.get();
      setUser(accountDetail);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();

    try {
      console.log("cred", credentials);

      const response = await account.createEmailPasswordSession(
        credentials.email,
        credentials.password
      );

      console.log("Logged In:", response);

      const accountDetail = await account.get();
      setUser(accountDetail);

      navigate("/");
    } catch (error) {
      console.log("error while login:", error);
    }
  };

  const handleUserLogout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserRegister = async (e, credentials) => {
    e.preventDefault();

    if (credentials.password1 !== credentials.password2) {
      alert("Password do not match!");
      return;
    }
    try {
      let response = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password1,
        credentials.name
      );

      await account.createEmailPasswordSession(credentials.email, credentials.password1)
      const accountDetail = await account.get()
      setUser(accountDetail)

      navigate('/')

      console.log("Registerd", response)
    } catch (error) {
      console.log("Registeration failed:", error);
    }
  };

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
    handleUserRegister,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading .....</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
