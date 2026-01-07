import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { Camera, User, Mail, ShieldCheck, Save } from "lucide-react";
import useAuth from "../hooks/useAuth";
import UseAxiosSecure from "../hooks/UseAxiosSecure";

const Profile = () => {
  const { user, updateProfileInfo } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(user?.photoURL);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue("name", user.displayName);
      setPreviewImage(user.photoURL);
    }
  }, [user, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let photoURL = user.photoURL;

      if (data.image && data.image[0]) {
        const imageFile = { image: data.image[0] };
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_api}`,
          imageFile,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        if (res.data.success) {
          photoURL = res.data.data.url;
        }
      }
      await updateProfileInfo({
        displayName: data.name,
        photoURL: photoURL,
      });

      const dbResponse = await axiosSecure.put(`/users/email/${user.email}`, {
        name: data.name,
        profilePic: photoURL,
      });

      if (dbResponse.data.modifiedCount > 0 || photoURL !== user.photoURL) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile Updated Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong updating your profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Profile Overview Card */}
        <div className="md:w-1/3 bg-blue-600 p-8 text-white flex flex-col items-center justify-center text-center">
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
              <img
                src={previewImage || "https://i.ibb.co/5GzXkwq/user.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold">{user?.displayName}</h2>
          <p className="opacity-90 text-sm mt-1">{user?.email}</p>
          
          <div className="mt-6 flex flex-col gap-2 w-full">
            <div className="bg-blue-700 rounded-lg p-3 flex items-center gap-3">
               <ShieldCheck size={20} />
               <span className="font-semibold uppercase text-xs tracking-wider">Role: User</span> 
               {/* Note: You can fetch real role from DB if needed, usually stored in context */}
            </div>
            <div className="bg-blue-700 rounded-lg p-3 flex items-center gap-3">
               <span className="text-xs">Member since: {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Update Form */}
        <div className="md:w-2/3 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
             <User className="text-blue-600" /> Update Profile
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Name Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Email Input (Read Only) */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={20}/>
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="w-full bg-gray-100 border border-gray-300 px-4 py-3 pl-10 rounded-lg cursor-not-allowed text-gray-500"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Update Profile Picture</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 transition">
                  <Camera size={20} />
                  <span>Choose File</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("image", { onChange: handleImageChange })} 
                  />
                </label>
                {/* File Name hint (optional) */}
                <span className="text-sm text-gray-500">
                   {/* Logic to show file name can go here */}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex justify-center items-center gap-2 shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <Save size={20} /> Save Changes
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Profile;