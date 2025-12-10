import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const tShirtId = useParams();
    const elements = useElements();
    const [error, setError] = useState("");
    const stripe = useStripe();
    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();
    const navigate =useNavigate();

    

    const { data: cartItem = {}, isPending, refetch } = useQuery({
        queryKey: ["cart-item", tShirtId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts/${tShirtId}`);
            return res.data;
        },
    });

    const priceTk = cartItem.price;
    const amountCents = priceTk * 100;

    if (isPending) return <p>Loading...</p>;


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        // 🔹 STEP-1: Create payment method
        const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (methodError) {
            setError(methodError.message);
            return;
        }
        else{
            console.log(paymentMethod);
        }

        // 🔹 STEP-2: Create payment intent from backend
        const intentRes = await axiosSecure.post("/create-payment-intent", {
            amountCents,
            tShirtId,
        });

        const clientSecret = intentRes.data.clientSecret;

        // 🔹 STEP-3: Confirm payment
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: user.displayName,
                    email: user.email,
                },
            },
        });

        if (result.error) {
            setError(result.error.message);
            return;
        }

        if (result.paymentIntent.status === "succeeded") {
            // 🔹 STEP-4: Save payment info in database
            const paymentData = {
                tShirtId,
                priceTk,
                userEmail: user.email,
                sellerEmail: cartItem.sellerEmail,
                transactionId: result.paymentIntent.id,
                paymentMethod: result.paymentIntent.payment_method_types,
                status: "success",
                paidAt: new Date(),
            };

            const saveRes = await axiosSecure.post("/payments", paymentData);

            if (saveRes.data.insertedId) {
                Swal.fire({
                    title: "Payment Successful",
                    text: "Your item has been paid!",
                    icon: "success",
                    confirmButtonText: "Go to Invoice",
                }).then(() => navigate(`/invoice/${saveRes.data.insertedId}`));

                refetch();
            }
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
                <CardElement className='p-2 ' />
                <button
                    type='submit'
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
                // disabled={!stripe}
                >
                    Pay {priceTk} tk
                </button>
                {error && <p className='text-red-400'>{error}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;