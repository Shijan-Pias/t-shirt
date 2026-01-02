import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaEdit, FaTrashAlt, FaTimes } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';

const ManageTShirts = () => {
    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedTShirt, setSelectedTShirt] = useState(null); 

    const { data: tShirts = [], isLoading } = useQuery({
        queryKey: ['my-tshirts', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/tShirts?sellerEmail=${user.email}`);
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/tShirts/${id}`);
                    if (res.data.deletedCount > 0) {
                        queryClient.invalidateQueries(['my-tshirts']);
                        Swal.fire("Deleted!", "Your file has been deleted.", "success");
                    }
                } catch (error) {
                    Swal.fire("Error!", "Something went wrong.", "error");
                    console.log(error);
                }
            }
        });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updateData = {
            title: form.title.value,
            brand: form.brand.value,
            category: form.category.value,
            price: parseFloat(form.price.value), 
            discount: parseFloat(form.discount.value),
            quantity: parseInt(form.quantity.value),
            color: form.color.value,
            size: form.size.value,
            stockStatus: form.stockStatus.value,
            description: form.description.value
        };

        try {
        
            const res = await axiosSecure.patch(`/tShirts/${selectedTShirt._id}`, updateData);

            if (res.data.modifiedCount > 0) {
                queryClient.invalidateQueries(['my-tshirts']);
                setSelectedTShirt(null);
                Swal.fire("Updated!", "Product info updated successfully.", "success");
            } else {
                 setSelectedTShirt(null);
                 Swal.fire("Info", "No changes detected", "info");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to update product", "error");
        }
    };

    if (isLoading) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="w-full p-8 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-8">Manage My Products</h2>
            
            {/* --- The Table --- */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
                <table className="table w-full">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="py-4 pl-6">#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tShirts.map((item, index) => (
                            <tr key={item._id} className="border-b hover:bg-amber-200">
                                <td className="pl-6 text-red-700 font-bold">{index + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            {/* Using existing image URL */}
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                    </div>
                                </td>
                                <td className="font-semibold text-green-700">{item.title}</td>
                                <td className="text-gray-500 text-sm">{item.brand}</td>
                                <td className='text-green-800'>${item.price}</td>
                                <td className="text-red-500 font-bold">{item.discount}%</td>
                                <td>
                                    <span className={`badge ${item.stockStatus === 'In Stock' ? 'badge-success' : 'badge-error'} text-white`}>
                                        {item.stockStatus}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    <button 
                                        onClick={() => setSelectedTShirt(item)}
                                        className="btn btn-sm btn-square bg-orange-500 text-white hover:bg-orange-600 border-none">
                                        <FaEdit />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-sm btn-square bg-red-600 text-white hover:bg-red-700 border-none">
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        
            {selectedTShirt && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 overflow-y-auto py-10">
                    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-3xl relative">
                        <button 
                            onClick={() => setSelectedTShirt(null)} 
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition">
                            <FaTimes size={24}/>
                        </button>
                        
                        <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Update: <span className="text-primary">{selectedTShirt.title}</span>
                        </h3>
                        
                        <form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            {/* Title */}
                            <div className="form-control md:col-span-2">
                                <label className="label text-sm font-bold">Product Title</label>
                                <input type="text" name="title" defaultValue={selectedTShirt.title} className="input input-bordered w-full" required />
                            </div>

                            {/* Brand */}
                            <div className="form-control">
                                <label className="label text-sm font-bold">Brand</label>
                                <input type="text" name="brand" defaultValue={selectedTShirt.brand} className="input input-bordered w-full" />
                            </div>

                            {/* Category */}
                            <div className="form-control">
                                <label className="label text-sm font-bold">Category</label>
                                <input type="text" name="category" defaultValue={selectedTShirt.category} className="input input-bordered w-full" />
                            </div>

                            {/* Price */}
                            <div className="form-control">
                                <label className="label text-sm font-bold">Price ($)</label>
                                <input type="number" name="price" step="0.01" defaultValue={selectedTShirt.price} className="input input-bordered w-full" required />
                            </div>

                            {/* Discount */}
                            <div className="form-control">
                                <label className="label text-sm font-bold">Discount (%)</label>
                                <input type="number" name="discount" defaultValue={selectedTShirt.discount} className="input input-bordered w-full" />
                            </div>

                            {/* Quantity */}
                            <div className="form-control">
                                <label className="label text-sm font-bold">Quantity</label>
                                <input type="number" name="quantity" defaultValue={selectedTShirt.quantity} className="input input-bordered w-full" />
                            </div>

                            {/* Stock Status */}
                            <div className="form-control">
                                <label className="label text-sm font-bold">Stock Status</label>
                                <select name="stockStatus" defaultValue={selectedTShirt.stockStatus} className="select select-bordered w-full">
                                    <option value="In Stock">In Stock</option>
                                    <option value="Out of Stock">Out of Stock</option>
                                </select>
                            </div>

                            {/* Color */}
                            <div className="form-control">
                                <label className="label text-sm font-bold">Color</label>
                                <input type="text" name="color" defaultValue={selectedTShirt.color} className="input input-bordered w-full" />
                            </div>

                            {/* Size */}
                            <div className="form-control">
                                <label className="label text-sm font-bold">Size</label>
                                <input type="text" name="size" defaultValue={selectedTShirt.size} className="input input-bordered w-full" />
                            </div>

                            {/* Description */}
                            <div className="form-control md:col-span-2">
                                <label className="label text-sm font-bold">Description</label>
                                <textarea name="description" defaultValue={selectedTShirt.description} className="textarea textarea-bordered h-24 w-full"></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="md:col-span-2 mt-4">
                                <button type="submit" className="btn btn-primary w-full text-lg">
                                    Save Product Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageTShirts;