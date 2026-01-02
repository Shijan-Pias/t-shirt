
import { motion } from "framer-motion";

import { Shirt } from "lucide-react";
import { Link, Outlet } from "react-router";


const AuthLayout = () => {
    return (

        <div>
            <Outlet />
            <div className="w-full  flex items-center justify-center bg-gray-50 p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8"
                >

                    {/* Small Footer */}
                    <div className="text-center text-sm text-gray-500 mt-6">
                        © {new Date().getFullYear()} T-Store. All rights reserved.
                    </div>
                </motion.div>
            </div>
        </div>

    );
};

export default AuthLayout;
