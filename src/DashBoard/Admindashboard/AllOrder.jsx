import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Truck, CheckCircle, Clock, CreditCard } from 'lucide-react';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';

const AllOrders = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['all-orders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data.data; 
        }
    });

    const totalSales = orders.reduce((sum, order) => sum + order.priceTk, 0);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            
            {/* Header & Stats */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Truck className="text-orange-500" /> All Order History
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Monitor all transactions and sales.</p>
                </div>

                {/* Total Sales Card */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl shadow-lg text-center">
                    <p className="text-sm font-medium opacity-90">Total Sales Revenue</p>
                    <h3 className="text-3xl font-bold">৳{totalSales.toLocaleString()}</h3>
                </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
                <table className="table w-full">
                    {/* Head */}
                    <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-bold">
                        <tr>
                            <th className="py-4 pl-6">#</th>
                            <th>Customer Email</th>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    
                    {/* Body */}
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id} className="hover:bg-gray-50 transition border-b border-gray-100 last:border-none">
                                <td className="font-bold text-gray-400 pl-6">{index + 1}</td>
                                
                                {/* Customer Email */}
                                <td>
                                    <span className="font-medium text-gray-700">{order.userEmail}</span>
                                </td>

                                {/* Transaction ID */}
                                <td>
                                    <div className="flex items-center gap-2">
                                        <CreditCard size={14} className="text-gray-400"/>
                                        <span className="text-green-600 font-mono text-xs bg-green-50 px-2 py-1 rounded border border-green-100">
                                            {order.transactionId}
                                        </span>
                                    </div>
                                </td>

                                {/* Amount */}
                                <td className="font-bold text-gray-900">
                                    ৳{order.priceTk}
                                </td>

                                {/* Date Formatting */}
                                <td className="text-sm text-gray-500">
                                    {new Date(order.createdAt).toLocaleDateString()} 
                                    <span className="text-xs ml-1 text-gray-400">
                                        {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </span>
                                </td>

                                {/* Status */}
                                <td>
                                    <div className={`flex items-center gap-1 font-bold text-xs uppercase px-3 py-1 rounded-full w-fit
                                        ${order.status === 'success' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                        {order.status === 'success' ? <CheckCircle size={12}/> : <Clock size={12}/>}
                                        {order.status}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty State */}
                {orders.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500">No orders found yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllOrders;