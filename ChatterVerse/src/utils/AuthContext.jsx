import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUserOnLoad()
  }, []);

  const getUserOnLoad = async () => {
    try {
      const accountDetail = await account.get();
      setUser(accountDetail);
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
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
       await account.deleteSession('current')
        setUser(null)
    } catch (error) {
        console.error(error)
    }
  }

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
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
