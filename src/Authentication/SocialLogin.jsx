import React from 'react';
import { FaGoogle } from "react-icons/fa";
const SocialLogin = () => {
    return (
        <div className="flex justify-center mt-4">
                    <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-green-300 transition">
                        <FaGoogle />
                        Continue with Google
                    </button>
                </div>
    );
};

export default SocialLogin;