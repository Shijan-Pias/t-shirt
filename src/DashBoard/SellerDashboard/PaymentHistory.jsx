
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';

const SellerPaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();

    const { data: payments = [], isLoading, error } = useQuery({
        queryKey: ['seller-payments', user?.email],
        enabled: !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/seller/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="text-center p-10">Loading history...</div>;
    }

    if (error) {
        return <div className="text-center p-10 text-red-500">Error loading data.</div>;
    }

    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                My Sales & Payment History
            </h2>
            
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6">Date</th>
                            <th className="py-3 px-6">Customer Email</th>
                            <th className="py-3 px-6">Transaction ID</th>
                            <th className="py-3 px-6 text-right">Amount</th>
                            <th className="py-3 px-6 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    No sales found yet.
                                </td>
                            </tr>
                        ) : (
                            payments.map((payment) => (
                                <tr key={payment._id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-6 whitespace-nowrap">
                                        {new Date(payment.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-6">
                                        {payment.userEmail}
                                    </td>
                                    <td className="py-3 px-6 font-mono text-xs">
                                        {payment.transactionId}
                                    </td>
                                    <td className="py-3 px-6 text-right font-bold text-green-600">
                                        {payment.priceTk} Tk
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <span className={`py-1 px-3 rounded-full text-xs 
                                            ${payment.status === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Summary Section */}
            <div className="mt-6 flex justify-end">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-lg font-semibold">Total Revenue: 
                        <span className="ml-2 text-green-600">
                            {payments.reduce((total, item) => total + item.priceTk, 0)} Tk
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SellerPaymentHistory;