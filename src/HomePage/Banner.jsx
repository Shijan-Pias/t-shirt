import React from 'react';
import { ShoppingCart, ArrowRight} from 'lucide-react';
import { Link } from 'react-router';
import image from '../assets/banner_pic.avif'

const Banner = () => {
  return (
    // Background: Soft Creamy/Off-white color for a clean look
    <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-[#FDFBF7] px-6 md:px-12 overflow-hidden font-sans">
      
      {/* Decorative Soft Background Blobs (Soft Design Element) */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* ---- Left Side: Text Content (Clean & Readable) ---- */}
        <div className="space-y-6 text-center md:text-left">
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold tracking-wide">
            New Arrival 2026
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 leading-tight">
            Comfort Meets <br/> 
            <span className="text-orange-500">Style.</span>
          </h1>
          
          <p className="text-gray-500 text-lg md:text-xl max-w-md mx-auto md:mx-0 leading-relaxed">
            Discover our premium cotton collection. Soft on skin, easy on the eyes. Perfect for your everyday vibe.
          </p>

          {/* Parent div: w-full এবং justify-center দিয়ে পুরো মাঝখানে আনা হয়েছে */}
<div className="w-full flex justify-center pt-8">
  
  <Link to='/shop'>
    <button className="group relative flex items-center justify-center gap-3 bg-gray-900 text-white px-10 py-4 rounded-full font-semibold tracking-wide overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:bg-black">
      
      {/* Button Text */}
      <span className="relative z-10">Shop Collection</span>
      
      {/* Icon: হোভার করলে আইকনটি একটু নড়বে (Nice Touch) */}
      <ShoppingCart 
        size={20} 
        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" 
      />

      {/* Optional: একটি সফট গ্লো ইফেক্ট বাটনের পেছনে */}
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
    
    </button>
  </Link>

</div>
          
          {/* Trust stats (Optional but looks professional) */}
          <div className="pt-8 flex items-center gap-8 justify-center md:justify-start grayscale opacity-60">
             <div className="text-sm font-bold">100% <br/><span className="font-normal text-xs">Cotton</span></div>
             <div className="w-px h-8 bg-gray-300"></div>
             <div className="text-sm font-bold">2k+ <br/><span className="font-normal text-xs">Reviews</span></div>
             <div className="w-px h-8 bg-gray-300"></div>
             <div className="text-sm font-bold">Fast <br/><span className="font-normal text-xs">Delivery</span></div>
          </div>
        </div>

        {/* ---- Right Side: Soft Image Layout ---- */}
        <div className="relative flex justify-center">
            {/* Main Image Container with Soft Rounded Corners */}
            <div className="relative w-[350px] h-[450px] md:w-[450px] md:h-[550px] bg-white p-4 rounded-[40px] shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500 ease-in-out">
                <img 
                  // This is a working link. Change this to your local image later.
                  src={image} 
                  alt="T-shirt Model" 
                  className="w-full h-full object-cover rounded-[30px]"
                />
                
                {/* Floating Card Feature (User Intent) */}
                <div className="absolute bottom-8 left-[-20px] md:left-[-40px] bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                        $25
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-800">Classic White Tee</p>
                        <p className="text-xs text-green-500 font-semibold">In Stock</p>
                    </div>
                </div>
            </div>
            
            {/* Background Shape behind image */}
            <div className="absolute -z-10 top-10 right-10 w-full h-full border-2 border-orange-200 rounded-[40px]"></div>
        </div>

      </div>
    </section>
  );
};

// Add this to your index.css or tailwind config for the slow bounce animation if needed
// keyframes: { 'bounce-slow': 'bounce 3s infinite' }

export default Banner;