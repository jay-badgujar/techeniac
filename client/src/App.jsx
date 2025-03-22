import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import './App.css'
import { AuthContext } from "./helpers/AuthContext";

// pages
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Game from './pages/Game'
import PageNotFound from './pages/PageNotFound'
import Profile from "./pages/Profile";

// services
import { getCookie } from "./services/CommonFunctions";

//components
import Alerts from "./components/Toast";

function App() {

  const [authState, setAuthState] = useState({
    userId: "",
    userEmail: "",
  });

  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/auth/auth`, {
      headers: {
        "accessToken_techeniac_user": getCookie(`accessToken_techeniac_user`),
      },
    })
      .then((response) => {
        if (response.data.error === "User not logged in!") {
          // Only redirect to login if the user is not on the signup page
          if (location.pathname !== "/signup") {
            navigate("/login");
          }
          return;
        }
        if (!response.data.error) {
          setAuthState({
            userId: response.data.userId,
            userEmail: response.data.email,
          });
        }
      });
  }, [navigate, location.pathname]);

  return (
    <>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Alerts />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/game" element={<Game />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
