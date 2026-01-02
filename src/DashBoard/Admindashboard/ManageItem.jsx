import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Trash2, ShoppingBag, AlertCircle } from 'lucide-react';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';

const ManageItems = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: tShirts = [], isLoading, refetch } = useQuery({
        queryKey: ['all-products-admin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tShirts');
            return res.data.reverse();
        }
    });

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete "${item.title}"? This cannot be undone!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/tShirts/${item._id}`);
                    if (res.data.deletedCount > 0) {
                        refetch(); 
                        Swal.fire({
                            title: "Deleted!",
                            text: "Product has been removed.",
                            icon: "success"
                        });
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong.",
                        icon: "error"
                        
                    });
                }
            }
        });
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <ShoppingBag className="text-orange-500" /> Manage All Products
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Admin oversight for all seller items.</p>
                </div>
                <div className="badge badge-lg badge-neutral p-4">Total Items: {tShirts.length}</div>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-bold">
                        <tr>
                            <th className="py-4 pl-6">#</th>
                            <th>Image</th>
                            <th>Product Info</th>
                            <th>Seller Info</th>
                            <th>Price</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    
                    {/* Table Body */}
                    <tbody>
                        {tShirts.map((item, index) => (
                            <tr key={item._id} className="hover:bg-gray-50 transition border-b border-gray-100 last:border-none">
                                <td className="font-bold text-gray-400 pl-6">
                                    {index + 1}
                                </td>
                                
                                {/* Product Image */}
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-14 h-14 bg-gray-100">
                                            <img src={item.image} alt={item.title} className="object-cover" />
                                        </div>
                                    </div>
                                </td>

                                {/* Product Details */}
                                <td>
                                    <div className="font-bold text-gray-800">{item.title}</div>
                                    <div className="text-xs text-gray-500 badge badge-ghost badge-sm mt-1">{item.brand}</div>
                                    <div className="text-xs text-gray-400 mt-1">Cat: {item.category}</div>
                                </td>

                                <td>
                                    <div className="text-sm font-medium text-gray-700">{item.sellerEmail}</div>
                                    
                                </td>

                                {/* Price */}
                                <td className="font-bold text-gray-900">
                                    ৳{item.discountPrice || item.price}
                                </td>

                                {/* Action Buttons */}
                                <td className="text-center">
                                    <button
                                        onClick={() => handleDeleteItem(item)}
                                        className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50 hover:text-red-700 transition-all tooltip"
                                        data-tip="Delete Product"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty State */}
                {tShirts.length === 0 && (
                    <div className="text-center py-20">
                        <AlertCircle size={40} className="mx-auto text-gray-300 mb-4"/>
                        <p className="text-gray-500">No products found in the database.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageItems;