import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const loadPromise= loadStripe(import.meta.env.VITE_payment_key);

const Payment = () => {
    return (
        <div>
            <Elements stripe={loadPromise}>
                <PaymentForm></PaymentForm>

            </Elements>
        </div>
    );
};

export default Payment;