import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutForm from './StripeCheckoutForm';
import Loader from 'ui-component/Loader';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';
import { getCheckoutSession } from 'store/slices/createAccount';

// Safe publishable key for local development
// can be committed to the repository
const stripeKeyToLocalDevelopment =
    'pk_test_51PAuaf05kjSh8547PwyJ9mSLAcr6jdu5MnHdB4LuXJ9kb5yJr8hSSvtXdom5Wq0ITRJTttmx2B0Km5sWQi43WxJG00pEMks9xg';
const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY || stripeKeyToLocalDevelopment);

const StripeWrapper = () => {
    useEffect(() => {
        dispatch(getCheckoutSession());
    }, []);

    const { intentClientSecret } = useSelector((state) => state.createAccount);
    const options = {
        clientSecret: intentClientSecret
    };
    return intentClientSecret ? (
        <Elements stripe={stripePromise} options={options}>
            <StripeCheckoutForm />
        </Elements>
    ) : (
        <Loader />
    );
};

export { StripeWrapper };
