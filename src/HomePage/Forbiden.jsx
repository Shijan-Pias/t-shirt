import React from 'react';
import { Link } from 'react-router';
import { FaLock, FaHome } from 'react-icons/fa';

const Forbidden = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center p-6">
            
            {/* --- Icon / Illustration --- */}
            <div className="bg-red-100 p-8 rounded-full mb-6 animate-pulse">
                <FaLock className="text-6xl text-red-500" />
            </div>

            {/* --- Error Code --- */}
            <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest">
                403
            </h1>
            
            <div className="bg-red-500 px-2 text-sm rounded rotate-12 absolute opacity-90 shadow-lg">
                Access Denied
            </div>

            {/* --- Text Content --- */}
            <div className="mt-8 max-w-md mx-auto">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    Stop! Restricted Area.
                </h3>
                <p className="text-gray-600 mb-8">
                    You do not have the necessary permissions to view this page. 
                    If you believe this is an error, please contact the administrator.
                </p>

                {/* --- Action Buttons --- */}
                <Link to="/" className="btn btn-primary btn-wide flex items-center gap-2 mx-auto">
                    <FaHome /> Go Back Home
                </Link>
            </div>
            
            {/* Decorative Background Blur */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
                <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>
        </div>
    );
};

export default Forbidden;