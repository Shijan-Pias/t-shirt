import React from 'react';
import { FaGoogle } from "react-icons/fa";
import useAuth from '../hooks/useAuth';
const SocialLogin = () => {
    const {signInGoogle} =useAuth();

    const handleGoogleLogin =()=>{
        signInGoogle()
        .then(result=>{
            console.log(result.user);
        })
        .catch(error=>{
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