import React from 'react';
import { FaGoogle } from "react-icons/fa";
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import UseAxiosSecure from '../hooks/UseAxiosSecure';
const SocialLogin = () => {
    const { signInGoogle } = useAuth();
    const axiosSecure =UseAxiosSecure();
    const navigate =useNavigate();

    const handleGoogleLogin = () => {
        signInGoogle()
            .then(async(result) => {
                const loggedInUser = result.user
                console.log(loggedInUser);
                const userInfo = {
                    name: loggedInUser.displayName,
                    email: loggedInUser.email,
                    role: "user", // Default role for Google Login
                    image: loggedInUser.photoURL,
                    status: "active"
                };

                const userRes = await axiosSecure.post('/users',userInfo)
                console.log(userRes.data);
                navigate('/')
            })
            .catch(error => {
                console.log(error);
            })


    }
    return (
        <div className="w-full">
            {/* OR divider */}
            <div className="flex items-center gap-3 my-4">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="text-gray-500">OR</span>
                <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Google Button */}
            <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition"
            >
                <img
                    className="w-5 h-5"
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google logo"
                />
                Continue with Google
            </button>
        </div>
    );
};

export default SocialLogin;