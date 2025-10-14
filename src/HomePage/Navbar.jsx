import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            T-Store
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 transition font-medium"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-gray-700 hover:text-indigo-600 transition font-medium"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-indigo-600 transition font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-indigo-600 transition font-medium"
            >
              Contact
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-full hover:bg-indigo-700 transition"
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
            </Link>

            {/* Auth */}
            <Link
              to="/login"
              className="border border-indigo-600 text-indigo-600 px-3 py-1.5 rounded-full hover:bg-indigo-600 hover:text-white transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col px-4 py-3 space-y-2">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-indigo-600">
              Shop
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600">
              Contact
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-2 text-indigo-600 font-medium"
            >
              <ShoppingCart size={18} /> Cart
            </Link>
            <Link
              to="/login"
              className="border border-indigo-600 text-indigo-600 px-3 py-1.5 rounded-full text-center hover:bg-indigo-600 hover:text-white transition"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
