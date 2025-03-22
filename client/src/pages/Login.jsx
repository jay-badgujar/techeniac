import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from "../helpers/AuthContext";

// services
import { setCookie } from '../services/CommonFunctions'

// components
import { showToast } from '../components/Toast'

const Login = () => {

  const navigate = useNavigate();

  const { setAuthState } = useContext(AuthContext);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, values);

        if (response.data.error) {
          showToast(response.data.error, "error");
        } else {
          setCookie("accessToken_techeniac_user", response.data.token, 24);
          setAuthState({
            userId: response.data.user.userId,
            userEmail: response.data.user.email,
          });
          navigate('/')
          showToast("Login successful", "success");
        }

      } catch (error) {
        showToast("Login failed. Please try again.", "error");
      }
    },
  });

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: "url('https://media.istockphoto.com/id/1805528558/vector/math-tools-formula-border-notebook-with-checkered-background.jpg?s=612x612&w=0&k=20&c=8rxs66urH4zC1oP6T5z_kX-TrS4_pq-uLzdIlswInBs=')" }}
    >
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg shadow-lg rounded-lg p-6 border border-white/30">
        <h2 className="text-2xl font-bold text-center text-white mb-4">Login</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              autoFocus
              {...formik.getFieldProps("email")}
              className="w-full p-3 border border-white/40 rounded-lg focus:ring focus:ring-blue-300 bg-white/10 text-white placeholder-white"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-700 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
              className="w-full p-3 border border-white/40 rounded-lg focus:ring focus:ring-blue-300 bg-white/10 text-white placeholder-white"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-700 text-sm">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
          <Link to="/signup" className="text-center text-white">
            Don't have an account? <span className="underline">Sign up</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;