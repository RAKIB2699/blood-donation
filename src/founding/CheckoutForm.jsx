// components/CheckoutForm.jsx
import React, { useState, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { AuthContext } from '../Provider/AuthProvider';

const CheckoutForm = ({ amount, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !amount || amount <= 0) {
            setError('Invalid payment setup or amount.');
            return;
        }

        setProcessing(true);
        setError('');

        try {
            // Create payment intent
            const { data } = await axiosSecure.post('/create-payment-intent', { amount });
            const clientSecret = data.clientSecret;


            const card = elements.getElement(CardElement);

            if (!card) {
                setError('Card information is not available.');
                setProcessing(false);
                return;
            }

            // Create payment method
            const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card,
            });

            if (paymentError) {
                setError(paymentError.message);
                setProcessing(false);
                return;
            }

            // Confirm payment
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                setError(confirmError.message);
                setProcessing(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                // Save funding data
                const paymentInfo = {
                    name: user?.displayName || 'Anonymous',
                    email: user?.email,
                    amount,
                    date: new Date().toISOString(),
                };
                console.log(paymentInfo);
                await axiosSecure.post('/fundings', paymentInfo);
                Swal.fire('Success', 'Thank you for your donation!', 'success');

                if (onSuccess) onSuccess();
            }
        } catch (err) {
            setError('Something went wrong. Please try again later.');
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#32325d',
                            '::placeholder': {
                                color: '#a0aec0',
                            },
                        },
                        invalid: {
                            color: '#e53e3e',
                        },
                    },
                }}
            />
            <button
                type="submit"
                disabled={!stripe || processing}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {processing ? 'Processing...' : `Donate ৳${amount}`}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
    );
};

export default CheckoutForm;
