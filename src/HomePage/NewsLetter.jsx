import React from 'react';
import { Mail } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="bg-gray-900 py-16 px-4 md:px-12 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-orange-500 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        
        <span className="text-orange-400 font-bold tracking-widest uppercase text-sm">Join the Club</span>
        
        <h2 className="text-2xl md:text-5xl font-bold text-white mt-3 mb-4">
          Get 10% Off Your First Order
        </h2>
        
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
          Subscribe to our newsletter and be the first to know about new drops, special offers, and exclusive events.
        </p>

        {/* Form */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <div className="relative flex-grow">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:bg-white/20 focus:border-white transition-all backdrop-blur-sm"
            />
          </div>
          <button className="bg-white text-gray-900 font-bold py-4 px-8 rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-lg transform hover:-translate-y-1">
            Subscribe
          </button>
        </div>

        <p className="text-gray-500 text-xs mt-4">
          By subscribing you agree to our Terms & Conditions.
        </p>

      </div>
    </section>
  );
};

export default Newsletter;