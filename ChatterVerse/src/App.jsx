import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Room from "./Pages/Room";
import LoginPage from "./Pages/LoginPage";
import PrivateRotues from "./compoents/PrivateRotues";
import { AuthProvider } from "./utils/AuthContext";
import Registerpage from "./Pages/Registerpage";  
function App() {

  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element = {<Registerpage/>} />
        <Route element={<PrivateRotues/>}>
          <Route path="/" element={<Room />} />
        </Route>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
