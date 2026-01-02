import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import {
    FaHome, FaUsers, FaClipboardList, FaMoneyBillWave,
    FaPlusCircle, FaBoxOpen, FaChartBar, FaUserShield,
    FaFlag, FaSignOutAlt, FaHistory
} from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/UseUserRole';


const DashBoardLayout = () => {
    const { user } = useAuth();
    const { role, isRoleLoading} = useUserRole();
    console.log(role);
    const navigate = useNavigate();

    const activeStyle = ({ isActive }) =>
        isActive
            ? "flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-lg shadow-md transition-all duration-300 transform scale-105"
            : "flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-base-300 hover:text-white rounded-lg transition-all duration-300";

    const handleLogout = () => {
        navigate('/login');
    };

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
                        <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-semibold badge badge-outline badge-primary">{ }</p>
                    </div>

                    {/* Navigation Menu */}
                    <ul className="menu p-4 w-full flex-grow space-y-2">


                        {/* ---------------- SHARED LINKS ---------------- */}
                        <div className="divider divider-neutral my-4"></div>

                        <li><NavLink to="/" className={activeStyle}><FaHome /> Home</NavLink></li>
                        {
                            role == "user" &&
                            <>
                                <li><NavLink to="/dashBoard/myCart" ><FaHome /> MyTShirt</NavLink></li>
                                <li><NavLink to="/dashBoard/paymentHistory" ><FaHome /> My Payment</NavLink></li>

                            </>
                        }
                        {
                            role == "seller" &&

                            <>
                                <li><NavLink to="/dashBoard/sellerPaymentHistory" ><FaHome /> All Payment</NavLink></li>
                                <li><NavLink to="/dashBoard/addTShirt" ><FaHome />Add tShirt</NavLink></li>
                                <li><NavLink to="/dashBoard/manageTShirt" ><FaHome />Manage TShirt</NavLink></li>
                            </>
                        }


                        {
                            role =="admin" && !isRoleLoading &&
                            <>
                                <li><NavLink to="/dashBoard/manageAdmin" ><FaHome />Manage Admin</NavLink></li>
                                <li><NavLink to="/dashBoard/manageItems" ><FaHome />All Item</NavLink></li>
                                <li><NavLink to="/dashBoard/allOrder" ><FaHome />Sales Product</NavLink></li>
                            </>
                        }


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