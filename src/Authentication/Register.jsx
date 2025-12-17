import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "./SocialLogin";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import { useNavigate } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { createUser, updateProfileInfo } = useAuth()
  const [profilePic, setProfilePic] = useState(null);
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("User Registered Data:", data);
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);

        //update user 
        //update in back-end
        const userData = {

          email: data.email,
          name: data.name,
          role: data.role, //default
          profileImage: profilePic,
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString()
        }

        const userRes = await axiosSecure.post('/users', userData);
        console.log(userRes.data);

        //update in firebase 
        const updateInfo = {
          displayName: data.name,
          photoURL: profilePic
        }

        updateProfileInfo(updateInfo)
          .then(() => {
            console.log('updated successfully');
          })
          .catch(error => {
            console.log(error);
          })




        navigate('/')

      })
      .catch(error => {
        console.error(error)
      })
    reset();
  };

  const handleImageFile = async (e) => {
    e.preventDefault();

    const image = e.target.files[0];
    console.log(image);

    const formData = new FormData();
    formData.append('image', image)

    const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_api}`
    const res = await axios.post(imageUrl, formData)
    console.log(res);
    setProfilePic(res.data.data.url);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:text-black"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:text-black"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Profile Picture
            </label>
            <input type="file" onChange={handleImageFile} className="input" placeholder="Enter your Picture " />
           
          </div>


          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:text-black"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role Select */}
          <div>
            <select
              {...register("role", { required: "Role is required" })}
              className="select select-bordered w-full"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="seller">Seller</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>

        {/* Google Button (optional UI only) */}
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
