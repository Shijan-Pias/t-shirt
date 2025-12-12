import React from 'react';
// Your Auth Hook
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();

    const { data: payments = [], isLoading, error } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email, // Check if user.email exists
        queryFn: async () => {
            // FIX 1: Use user.email (not user.userEmail)
            // FIX 2: Use ?email= (Query Parameter) to match your backend
            const res = await axiosSecure.get(`/payments?email=${user.email}`);

            // Your backend returns { success: true, data: [...] }
            // So we need to return res.data.data to get the array
            return res.data.data;
        }
    });

    if (isLoading) {
        return <div className="text-center mt-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Payment History</h2>
                    <p className="text-gray-500 mt-1">Check all your recent transactions</p>
                </div>
                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className="stat-title">Total Payments</div>
                        <div className="stat-value text-blue-600">{payments.length}</div>
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-100">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
                        <tr>
                            <th className="py-4 pl-6">#</th>
                            <th>Transaction ID</th>
                            <th>Price (Tk)</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="text-gray-700">
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-8 text-gray-400">
                                    No payment history found.
                                </td>
                            </tr>
                        ) : (
                            payments.map((payment, index) => (
                                <tr key={payment._id} className="hover:bg-gray-50 transition duration-200">
                                    {/* Index */}
                                    <th className="pl-6">{index + 1}</th>

                                    {/* Transaction ID */}
                                    <td className="font-mono text-xs md:text-sm text-gray-500">
                                        {payment.transactionId}
                                    </td>

                                    {/* Price */}
                                    <td className="font-bold text-gray-800">
                                        ৳ {payment.priceTk}
                                    </td>

                                    {/* Date Formatting */}
                                    <td>
                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                {new Date(payment.paidAt).toLocaleDateString()}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {new Date(payment.paidAt).toLocaleTimeString()}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Status Badge */}
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold 
                                            ${payment.status === 'success'
                                                ? 'bg-green-100 text-green-700 border border-green-200'
                                                : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                            }`}
                                        >
                                            {payment.status.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;