import { motion } from "framer-motion";
import tshirt1 from "../assets/istockphoto-1273940716-612x612.jpg";
import tshirt2 from "../assets/hiking-business-t-shirt-design-idea.jpg";
import tshirt3 from "../assets/size_L.webp";

const Banner = () => {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Side (Text + Button) */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Style That Speaks — <br />
            <span className="text-indigo-600">Your Perfect Tee Awaits!</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Discover our latest collection of premium cotton T-shirts designed
            for comfort, quality, and your unique vibe.
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition duration-300">
            Get Started
          </button>
        </motion.div>

        {/* Right Side (T-shirt Images) */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-center relative"
        >
          {/* Background Circle Design */}
          <div className="absolute -z-10 bg-indigo-100 rounded-full w-72 h-72 md:w-96 md:h-96 blur-3xl opacity-60"></div>

          {/* T-shirt Images */}
          <div className="flex gap-4 md:gap-6">
            <motion.img
              src={tshirt1}
              alt="T-shirt 1"
              className="w-28 md:w-30 md:h-30 rounded-xl shadow-md hover:scale-105 transition"
              whileHover={{ scale: 1.05 }}
            />
            <motion.img
              src={tshirt2}
              alt="T-shirt 2"
              className="w-28 md:w-40 md:h-40 rounded-xl shadow-md hover:scale-105 transition"
              whileHover={{ scale: 1.05 }}
            />
            <motion.img
              src={tshirt3}
              alt="T-shirt 3"
              className="w-28 md:w-50 md:h-50 rounded-xl shadow-md hover:scale-105 transition"
              whileHover={{ scale: 1.05 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
