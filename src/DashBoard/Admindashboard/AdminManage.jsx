import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaSearch, FaUserCog, FaStore, FaUser, FaSpinner } from 'react-icons/fa';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';

const AdminManage = () => {
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();
    const [searchText, setSearchText] = useState("");

    // --- 1. Fetch Users (Only when searching) ---
    const { data: users = [], isLoading, isFetching } = useQuery({
        queryKey: ["users-search", searchText],
        // Only run query if searchText is not empty to save resources
        enabled: searchText.length > 0,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search?query=${searchText}`);
            return res.data;
        },
    });

    // --- 2. Mutation (Update Role) ---
    const roleMutation = useMutation({
        mutationFn: async ({ id, role }) => {
            const res = await axiosSecure.patch(`/users/role/${id}`, { role });
            return res.data;
        },
        onSuccess: (_, variables) => {
            // Refresh the list immediately
            queryClient.invalidateQueries(["users-search"]);
            Swal.fire({
                icon: "success",
                title: "Role Updated!",
                text: `User is now a ${variables.role}`,
                timer: 2000,
                showConfirmButton: false,
            });
        },
        onError: () => {
            Swal.fire("Error", "Failed to update role", "error");
        }
    });

    // --- 3. Handlers ---
    const handleSearch = (e) => {
        e.preventDefault();
        // The query key dependency [searchText] will auto-trigger the fetch
        queryClient.invalidateQueries(["users-search"]);
    };

    const handleRoleChange = (user, newRole) => {
        Swal.fire({
            title: `Change to ${newRole}?`,
            text: `Are you sure you want to make ${user.name} a ${newRole}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm!"
        }).then((result) => {
            if (result.isConfirmed) {
                roleMutation.mutate({ id: user._id, role: newRole });
            }
        });
    };

    // Helper to get badge color
    const getRoleBadge = (role) => {
        switch (role) {
            case 'admin': return 'badge-secondary'; // Purple/Pink
            case 'seller': return 'badge-accent';   // Teal/Green
            default: return 'badge-ghost';          // Gray
        }
    };

    return (
        <div className="w-full p-8 bg-gray-50 min-h-screen font-sans">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

                {/* --- Header Section --- */}
                <div className="bg-gray-900 p-8 text-center">
                    <h2 className="text-3xl font-bold text-white tracking-wide">
                        User Role Management
                    </h2>
                    <p className="text-gray-400 mt-2">Search and manage permissions securely</p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="mt-6 flex justify-center">
                        <div className="join w-full max-w-lg">
                            <input
                                className="input input-bordered join-item w-full focus:outline-none"
                                placeholder="Search by Name or Email..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary join-item px-8">
                                <FaSearch /> Search
                            </button>
                        </div>
                    </form>
                </div>

                {/* --- Content Section --- */}
                <div className="p-6">
                    {/* Loading State */}
                    {(isLoading || isFetching) && (
                        <div className="flex justify-center items-center py-20">
                            <FaSpinner className="animate-spin text-4xl text-primary" />
                            <span className="ml-3 text-lg font-medium text-gray-600">Searching database...</span>
                        </div>
                    )}

                    {/* Initial Empty State */}
                    {!isLoading && !isFetching && users.length === 0 && searchText === "" && (
                        <div className="text-center py-20 text-gray-400">
                            <FaUserCog className="mx-auto text-6xl mb-4 opacity-20" />
                            <p>Type a name or email above to find users.</p>
                        </div>
                    )}

                    {/* Not Found State */}
                    {!isLoading && !isFetching && users.length === 0 && searchText !== "" && (
                        <div className="text-center py-20 text-red-400">
                            <p className="text-xl font-semibold">No users found.</p>
                            <p className="text-sm">Try checking the spelling.</p>
                        </div>
                    )}

                    {/* --- Users Table --- */}
                    {!isLoading && users.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                {/* Table Head */}
                                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                                    <tr>
                                        <th className="py-4">User Profile</th>
                                        <th>Current Role</th>
                                        <th className="text-center">Available Actions</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id} className="border-b hover:bg-gray-50 transition">

                                            {/* Column 1: Profile */}
                                            <td>
                                                <div className="flex items-center gap-4">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-14 h-14 bg-gray-200">
                                                            <img
                                                                src={user.profileImage || "https://via.placeholder.com/150"}
                                                                alt="Avatar"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-lg text-gray-800">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500 font-mono">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Column 2: Current Role */}
                                            <td>
                                                <div className={`badge ${getRoleBadge(user.role)} gap-2 p-3 text-white font-bold uppercase`}>
                                                    {user.role === 'admin' && <FaUserCog />}
                                                    {user.role === 'seller' && <FaStore />}
                                                    {(!user.role || user.role === 'user') && <FaUser />}
                                                    {user.role || 'USER'}
                                                </div>
                                            </td>

                                            {/* Column 3: Actions (Dynamic Buttons) */}
                                            <td>
                                                <div className="flex justify-center gap-2">
                                                    {/* Show 'Make Admin' if not Admin */}
                                                    {user.role !== 'admin' && (
                                                        <button
                                                            onClick={() => handleRoleChange(user, 'admin')}
                                                            className="btn btn-sm btn-outline btn-secondary hover:text-white"
                                                            title="Promote to Admin">
                                                            <FaUserCog /> Make Admin
                                                        </button>
                                                    )}

                                                    {/* Show 'Make Seller' if not Seller */}
                                                    {user.role !== 'seller' && (
                                                        <button
                                                            onClick={() => handleRoleChange(user, 'seller')}
                                                            className="btn btn-sm btn-outline btn-accent hover:text-white"
                                                            title="Promote to Seller">
                                                            <FaStore /> Make Seller
                                                        </button>
                                                    )}

                                                    {/* Show 'Make User' if currently Admin or Seller */}
                                                    {(user.role === 'admin' || user.role === 'seller') && (
                                                        <button
                                                            onClick={() => handleRoleChange(user, 'user')}
                                                            className="btn btn-sm btn-ghost hover:bg-gray-200 text-gray-500"
                                                            title="Demote to User">
                                                            <FaUser /> Make User
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminManage;