import React from "react";
import gameBg from "../assets/gamebg.jpg";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

const Profile = () => {

  const location = useLocation();

  const userData = location.state?.userData || {};

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${gameBg})`, backgroundPosition: "cover", }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>

      <Navbar data={userData} />

      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-2xl w-full border border-white/20">
          <div className="flex justify-center mb-6">
            <img
              src={`${import.meta.env.VITE_BASE_URL}/uploads/${userData?.profile_picture}`}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />
          </div>

          <div className="space-y-4 text-white">
            <div className="flex items-center">
              <span className="font-semibold w-32">First Name:</span>
              <span>{userData?.first_name}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">Last Name:</span>
              <span>{userData?.last_name}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">Email:</span>
              <span>{userData?.email}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">Phone Number:</span>
              <span>{userData?.phone_number}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">Birth Date:</span>
              <span>{formatDate(userData?.birth_date)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;