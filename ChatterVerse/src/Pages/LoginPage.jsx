import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [credentials, setCredentials] = useState({
    email:'',
    password:'',
  });
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleInputChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    setCredentials({...credentials, [name]:value})
    console.log("cred:", credentials)
  }



  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <form action="">
          <div className="field--wrapper">
            <label htmlFor="">Email:</label>
            <input
              type="email"
              required
              name="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper">
            <label htmlFor="">Password:</label>
            <input
              type="password"
              required
              name="password"
              placeholder="Enter password..."
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper">
            <input className="btn btn--lg btn--main " type="submit" value="Login/" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
