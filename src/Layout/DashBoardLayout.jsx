import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router'; // Fixed import 'react-router-dom'
// import UseUserRole from '../hook/UseUserRole';
import { 
  FaHome, FaUsers, FaClipboardList, FaMoneyBillWave, 
  FaPlusCircle, FaBoxOpen, FaChartBar, FaUserShield, 
  FaFlag, FaSignOutAlt, FaHistory 
} from 'react-icons/fa';

// Optional: Import a hook to get user data like name/image if you have it
// import useAuth from '../hooks/useAuth';

const DashBoardLayout = () => {
    // Mock user data for display (Replace with real user data from AuthContext)
    const user = { 
        displayName: "Rahat", 
        photoURL: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
        email: "user@example.com"
    };

    // const { role, roleLoading } = UseUserRole();
    const navigate = useNavigate();

    // Helper for Active Link Styling
    const activeStyle = ({ isActive }) =>
        isActive
            ? "flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-lg shadow-md transition-all duration-300 transform scale-105"
            : "flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-base-300 hover:text-white rounded-lg transition-all duration-300";

    const handleLogout = () => {
        // Add your logout logic here
        navigate('/login');
    };

    // if (roleLoading) {
    //     return <div className="h-screen flex justify-center items-center bg-base-300"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    // }

    return (
        <div className="drawer lg:drawer-open bg-base-200 min-h-screen font-sans">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            
            {/* --- MAIN CONTENT AREA --- */}
            <div className="drawer-content flex flex-col">
                
                {/* Mobile Navbar (Only visible on small screens) */}
                <div className="w-full navbar bg-base-100 lg:hidden shadow-md z-10 sticky top-0">
                    <div className="flex-none">
                        <label htmlFor="dashboard-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 text-xl font-bold text-gray-700">Dashboard</div>
                    <div className="flex-none gap-2">
                        <div className="avatar">
                             <div className="w-10 rounded-full">
                                <img src={user.photoURL} alt="User" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Content Rendered Here */}
                <div className="p-4 md:p-8 bg-base-200 min-h-screen">
                    <Outlet />
                </div>
            </div>

            {/* --- SIDEBAR --- */}
            <div className="drawer-side z-20">
                <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                
                <aside className="bg-[#1e1e2f] text-base-content w-72 min-h-full flex flex-col">
                    
                    {/* Sidebar Header: Logo & Profile */}
                    <div className="p-6 flex flex-col items-center border-b border-gray-700/50">
                        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6 tracking-wide">
                            PHARMACY APP
                        </h2>
                        
                        <div className="avatar online mb-3">
                            <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user.photoURL} alt="User" />
                            </div>
                        </div>
                        <h3 className="text-white font-bold text-lg">{user.displayName}</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-semibold badge badge-outline badge-primary">{}</p>
                    </div>

                    {/* Navigation Menu */}
                    <ul className="menu p-4 w-full flex-grow space-y-2">
                        
                        {/* ---------------- ADMIN LINKS ---------------- */}
                        {/* {role === 'admin' && (
                            <>
                                <li className="menu-title text-gray-500 text-xs uppercase font-bold mt-2 mb-1 pl-2">Admin Control</li>
                                <li><NavLink to="/dashboard/makeAdmin" className={activeStyle}><FaUserShield /> Make Admin</NavLink></li>
                                <li><NavLink to="/dashboard/manageCategory" className={activeStyle}><FaClipboardList /> Manage Category</NavLink></li>
                                <li><NavLink to="/dashboard/adminPayment" className={activeStyle}><FaMoneyBillWave /> Admin Payment</NavLink></li>
                                <li><NavLink to="/dashboard/report" className={activeStyle}><FaFlag /> Report Admin</NavLink></li>
                            </>
                        )} */}

                        {/* ---------------- SELLER LINKS ---------------- */}
                        {/* {role === 'seller' && (
                            <>
                                <li className="menu-title text-gray-500 text-xs uppercase font-bold mt-2 mb-1 pl-2">Seller Zone</li>
                                <li><NavLink to="/dashboard/addMedicine" className={activeStyle}><FaPlusCircle /> Add Medicine</NavLink></li>
                                <li><NavLink to="/dashboard/manageMedicine" className={activeStyle}><FaBoxOpen /> Manage Medicine</NavLink></li>
                                <li><NavLink to="/dashboard/sellerPaymentHistory" className={activeStyle}><FaHistory /> Payment History</NavLink></li>
                            </>
                        )} */}

                        {/* ---------------- USER LINKS ---------------- */}
                        {/* {role === 'user' && (
                            <>
                                <li className="menu-title text-gray-500 text-xs uppercase font-bold mt-2 mb-1 pl-2">My Account</li>
                                <li><NavLink to="/dashboard/paymentHistory" className={activeStyle}><FaHistory /> Payment History</NavLink></li>
                            </>
                        )} */}

                        {/* ---------------- SHARED LINKS ---------------- */}
                        <div className="divider divider-neutral my-4"></div>
                        
                        <li><NavLink to="/" className={activeStyle}><FaHome /> Home</NavLink></li>
                        <li><NavLink to="/dashBoard/myCart" ><FaHome /> MyTShirt</NavLink></li>
                    </ul>

                    {/* Sidebar Footer: Logout */}
                    <div className="p-4 border-t border-gray-700/50">
                        <button onClick={handleLogout} className="btn btn-outline btn-error w-full flex items-center gap-2 text-white hover:bg-error hover:text-white">
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default DashBoardLayout;