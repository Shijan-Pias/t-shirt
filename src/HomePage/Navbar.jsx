import { useState, useRef, useEffect } from "react";
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Search, 
  LogOut, 
  LayoutDashboard, 
  Settings, 
  ChevronDown,
  Store 
} from "lucide-react";
import { Link } from "react-router"; 
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Scrolled state for styling changes (shadow)
  const [isScrolled, setIsScrolled] = useState(false);

  const { user, logOut } = useAuth(); 

  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Detect scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      setIsProfileOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      {/* FIXED CONTAINER:
        This forces the entire header (Black Bar + White Nav) to stay at the top.
        'fixed w-full top-0 z-50' ensures it floats above everything.
      */}
      <div className="fixed w-full top-0 z-50">
        
        {/* 1. TOP UTILITY BAR */}
        <div className="bg-slate-900 text-slate-300 text-xs py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <p className="hidden sm:block">Free shipping on orders over $50 🚚</p>
            <div className="flex gap-4">
              <Link to="/help" className="hover:text-white transition">Help Center</Link>
              {!user || user.role === 'user' ? (
                 <Link to="/become-seller" className="hover:text-white transition font-bold text-indigo-400">
                   Become a Seller
                 </Link>
              ) : null}
            </div>
          </div>
        </div>

        {/* 2. MAIN NAVBAR */}
        <nav 
          className={`bg-white transition-shadow duration-300 ${
            isScrolled ? "shadow-md" : "shadow-sm border-b border-gray-100"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              
              {/* LEFT: Logo */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-indigo-600 text-white p-2 rounded-lg group-hover:bg-indigo-700 transition">
                  <Store size={24} />
                </div>
                <span className="text-2xl font-bold text-gray-900 tracking-tight">
                  T-Store
                </span>
              </Link>

              {/* CENTER: Desktop Menu & Search */}
              <div className="hidden md:flex flex-1 items-center justify-center px-8 gap-8">
                <div className="flex gap-6 text-sm font-medium text-gray-600">
                  <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
                  <Link to="/shop" className="hover:text-indigo-600 transition">Shop</Link>
                  <Link to="/new-arrivals" className="hover:text-indigo-600 transition">New Arrivals</Link>
                </div>
                
                {/* Search Bar */}
                <div className="relative w-full max-w-md hidden lg:block">
                  <input 
                    type="text" 
                    placeholder="Search t-shirts..." 
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                </div>
              </div>

              {/* RIGHT: Actions */}
              <div className="flex items-center gap-4">
                
                <button className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <Search size={20} />
                </button>

                <Link to="/myCart" className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition">
                  <ShoppingCart size={20} />
                </Link>

                {user ? (
                  <div className="relative" ref={dropdownRef}>
                    <button 
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 p-1 pl-2 pr-1 rounded-full border border-gray-200 hover:shadow-md transition cursor-pointer"
                    >
                      <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200 overflow-hidden">
                        {user.photoURL || user.avatar ? (
                          <img src={user.photoURL || user.avatar} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                          <span>{user?.displayName ? user.displayName[0] : "U"}</span>
                        )}
                      </div>
                      <ChevronDown size={14} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-100">
                        
                        <div className="px-5 py-4 bg-gray-50 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">{user.displayName || user.name || "User"}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          <span className="mt-2 inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-600 bg-indigo-50 rounded-full">
                            {user.role || "User"} account
                          </span>
                        </div>

                        <div className="py-2">
                          <Link 
                            to='/dashBoard'
                            className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <LayoutDashboard size={18} className="text-gray-400" />
                            Dashboard
                          </Link>
                          
                          <Link 
                            to="/settings" 
                            className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <Settings size={18} className="text-gray-400" />
                            Settings
                          </Link>
                        </div>

                        <div className="border-t border-gray-100 bg-gray-50 p-2">
                          <button 
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
                          >
                            <LogOut size={18} />
                            Log Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition text-sm"
                  >
                    Login
                  </Link>
                )}

                <button 
                  className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 px-4 py-6 space-y-4 shadow-lg max-h-[80vh] overflow-y-auto">
               <div className="space-y-3">
                 <Link to="/" className="block text-lg font-medium text-gray-900" onClick={() => setIsOpen(false)}>Home</Link>
                 <Link to="/shop" className="block text-lg font-medium text-gray-900" onClick={() => setIsOpen(false)}>Shop</Link>
                 <Link to="/contact" className="block text-lg font-medium text-gray-900" onClick={() => setIsOpen(false)}>Contact</Link>
               </div>
               
               {user && (
                 <div className="pt-6 border-t border-gray-100">
                   <div className="flex items-center gap-3 mb-4">
                     <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold overflow-hidden">
                        {user.photoURL || user.avatar ? (
                          <img src={user.photoURL || user.avatar} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                          <span>{user?.displayName ? user.displayName[0] : "U"}</span>
                        )}
                     </div>
                     <div>
                       <p className="font-medium text-gray-900">{user.displayName || user.name}</p>
                       <p className="text-sm text-gray-500">{user.email}</p>
                     </div>
                   </div>
                   <Link to='/dashBoard' className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Dashboard</Link>
                   <Link to="/settings" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Settings</Link>
                   <button 
                     onClick={handleLogout}
                     className="block w-full text-left py-2 text-red-600 font-medium"
                   >
                     Sign Out
                   </button>
                 </div>
               )}
            </div>
          )}
        </nav>
      </div>

      {/* SPACER DIV:
        This is crucial. Because the header is 'fixed', it floats *over* the content.
        This invisible div pushes your page content down by roughly 112px 
        (TopBar height + Navbar height) so nothing is hidden behind the header.
      */}
      <div className="h-[112px] w-full"></div>
    </>
  );
};

export default Navbar;