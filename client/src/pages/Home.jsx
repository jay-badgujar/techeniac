import React, { useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { deleteCookie } from "../services/CommonFunctions";
import gameBg from "../assets/gamebg.jpg";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    deleteCookie();
    navigate("/login");
  };

  useEffect(() => {
    if (authState.userEmail !== "") {
      axios.get(`${import.meta.env.VITE_BASE_URL}/auth/user/${authState.userId}`).then((response) => {
        setUserData(response.data);
      }).catch((error) => {
        alert("Failed to fetch user data");
      });
    }
  }, [authState]);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url(" + gameBg + ")",
        backgroundPosition: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>

      <Navbar data={userData} />

      <div className="absolute inset-0 flex justify-center items-center z-20">
        <Link
          to="/game"
          className="text-4xl font-bold text-white bg-blue-600/50 hover:bg-blue-600/50 px-8 py-4 rounded-lg shadow-lg transition-all duration-300"
        >
          Start Game
        </Link>
      </div>

      <button
        className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg hover:bg-red-600 z-50"
        onClick={handleLogout}
      >
        <span>Logout</span>
        <i className="fa-solid fa-right-from-bracket mx-2"></i>
      </button>
    </div>
  );
};

export default Home;