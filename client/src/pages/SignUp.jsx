import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { showToast } from '../components/Toast'
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    profilePicture: Yup.mixed().required("Profile Picture is required"),
    birthDate: Yup.date().required("Birth Date is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone Number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      profilePicture: null,
      birthDate: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("profilePicture", values.profilePicture);
        formData.append("birthDate", values.birthDate);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("password", values.password);

        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/register`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.data.message == "User registered successfully") {
          showToast("User registered successfully", "success")
          navigate('/login')
        } else {
          showToast(response.data.message, "error")
        }
      } catch (error) {
        alert("Registration failed. Please try again.");
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      formik.setFieldValue("profilePicture", file);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: "url('https://media.istockphoto.com/id/1805528558/vector/math-tools-formula-border-notebook-with-checkered-background.jpg?s=612x612&w=0&k=20&c=8rxs66urH4zC1oP6T5z_kX-TrS4_pq-uLzdIlswInBs=')" }}
    >
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg shadow-lg rounded-lg p-6 border border-white/30">
        <h2 className="text-2xl font-bold text-center text-white mb-4">Sign Up</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="First Name"
                autoFocus
                {...formik.getFieldProps("firstName")}
                className="w-full p-3 border border-white/40 rounded-lg focus:ring focus:ring-blue-300 bg-white/10 text-white placeholder-white"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-700 text-sm">{formik.errors.firstName}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                {...formik.getFieldProps("lastName")}
                className="w-full p-3 border border-white/40 rounded-lg focus:ring focus:ring-blue-300 bg-white/10 text-white placeholder-white"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-red-700 text-sm">{formik.errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
              className="w-full p-3 border border-white/40 rounded-lg focus:ring focus:ring-blue-300 bg-white/10 text-white placeholder-white"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-700 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="date"
                {...formik.getFieldProps("birthDate")}
                className="w-full p-3 border border-white/40 rounded-lg focus:ring focus:ring-blue-300 bg-white/10 text-white placeholder-white"
              />
              {formik.touched.birthDate && formik.errors.birthDate && (
                <p className="text-red-700 text-sm">{formik.errors.birthDate}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Phone Number"
                {...formik.getFieldProps("phoneNumber")}
                className="w-full p-3 border border-white/40 rounded-lg focus:ring focus:ring-blue-300 bg-white/10 text-white placeholder-white"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-red-700 text-sm">{formik.errors.phoneNumber}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                {...formik.getFieldProps("confirmPassword")}
                className="w-full p-3 border border-white/40 rounded-lg focus:ring focus:ring-blue-300 bg-white/10 text-white placeholder-white"
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-red-700 text-sm">{formik.errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <label className="w-full text-center p-3 border border-white/40 rounded-lg cursor-pointer bg-blue-500 text-white hover:bg-blue-600">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              Upload Profile Picture
            </label>
            {formik.touched.profilePicture && formik.errors.profilePicture && (
              <p className="text-red-700 text-sm mt-1">{formik.errors.profilePicture}</p>
            )}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="mt-4 w-24 h-24 rounded-full object-cover border-2 border-white"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;