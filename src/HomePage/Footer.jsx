import React from "react";
import { Link } from "react-router"; 
import { Facebook, Instagram, Twitter, Linkedin, Mail, ArrowRight, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white tracking-tighter">
            TEE<span className="text-orange-500">STORE</span>.
          </h2>
          <p className="text-sm leading-relaxed max-w-xs">
            Premium quality apparel designed for the modern individual. 
            Sustainable fabrics, effortless style, and comfort that lasts all day.
          </p>
          
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
               <div className="bg-gray-800 p-2 rounded-full"><MapPin size={16} className="text-white"/></div>
               <span className="text-sm">123 Fashion St, Dhaka, BD</span>
            </div>
            <div className="flex items-center gap-3">
               <div className="bg-gray-800 p-2 rounded-full"><Phone size={16} className="text-white"/></div>
               <span className="text-sm">+880 1234 567 890</span>
            </div>
          </div>
        </div>

        {/* Column 2: Shopping Links */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Shop</h3>
          <ul className="space-y-4 text-sm">
            {['Men', 'Women', 'New Arrivals', 'Best Sellers', 'Accessories'].map((item) => (
              <li key={item}>
                <Link 
                  to="/shop" 
                  className="hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-1 group"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Customer Support */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Support</h3>
          <ul className="space-y-4 text-sm">
            {[
              { name: 'Track Order', link: '/orders' },
              { name: 'Returns & Exchanges', link: '/returns' },
              { name: 'Shipping Info', link: '/shipping' },
              { name: 'FAQs', link: '/faq' },
              { name: 'Contact Us', link: '/contact' }
            ].map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.link} 
                  className="hover:text-white hover:pl-2 transition-all duration-300 inline-block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Stay in the Loop</h3>
          <p className="text-sm mb-4">Be the first to know about new drops and exclusive offers.</p>
          
          <form className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-gray-900 border border-gray-700 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:border-orange-500 transition-colors text-sm"
              />
            </div>
            <button className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
              Subscribe <ArrowRight size={18}/>
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex gap-4 mt-8">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
              <a 
                key={idx} 
                href="#" 
                className="bg-gray-800 p-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/*  Copyright & Payment */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <p className="text-xs text-gray-500">
            © {currentYear} TeeStore. Built by <span className="text-white">Pias</span>.
          </p>

         
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-gray-600 uppercase">We Accept</span>
            <div className="flex gap-2 opacity-70 grayscale hover:grayscale-0 transition-all">
               
               <div className="h-6 w-10 bg-white rounded flex items-center justify-center text-[8px] font-bold text-blue-800 border">VISA</div>
               <div className="h-6 w-10 bg-white rounded flex items-center justify-center text-[8px] font-bold text-red-600 border">Rocket</div>
               <div className="h-6 w-10 bg-white rounded flex items-center justify-center text-[8px] font-bold text-blue-500 border">Nagad</div>
               <div className="h-6 w-10 bg-white rounded flex items-center justify-center text-[8px] font-bold text-pink-600 border">BKASH</div>
            </div>
          </div>
          
        </div>
      </div>

    </footer>
  );
};

export default Footer;