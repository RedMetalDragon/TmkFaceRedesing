import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutForm from './StripeCheckoutForm';
import Loader from 'ui-component/Loader';
import { useSelector } from 'react-redux';
const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY);

const StripeWrapper = () => {
    const { customerId, intentClientSecret } = useSelector((state) => state.createAccount);
    const options = {
        customerId: customerId,
        clientSecret: intentClientSecret
    };

    return intentClientSecret && customerId ? (
        <Elements stripe={stripePromise} options={options}>
            <StripeCheckoutForm customerId={customerId} />
        </Elements>
    ) : (
        <Loader />
    );
};

export { StripeWrapper };
