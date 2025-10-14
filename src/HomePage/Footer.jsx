import { Facebook, Instagram, Mail, Twitter } from "lucide-react";
import { Link } from "react-router";



const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">TeeStore</h2>
          <p className="text-sm">
            Discover stylish and comfortable T-shirts made from premium fabric.
            Designed for everyone, made for every day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-indigo-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-indigo-500 transition">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-indigo-500 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-indigo-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/faq" className="hover:text-indigo-500 transition">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/returns" className="hover:text-indigo-500 transition">
                Return Policy
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-indigo-500 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-indigo-500 transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Stay Connected</h3>
          <p className="text-sm mb-3">Subscribe for latest offers & trends.</p>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-3 py-2 rounded-l-md text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-indigo-600 px-4 py-2 rounded-r-md hover:bg-indigo-700 transition text-white"
            >
              <Mail size={18} />
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-5">
            <a href="#" className="hover:text-indigo-500 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-indigo-500 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-indigo-500 transition">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} <span className="text-indigo-500">TeeStore</span>. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
