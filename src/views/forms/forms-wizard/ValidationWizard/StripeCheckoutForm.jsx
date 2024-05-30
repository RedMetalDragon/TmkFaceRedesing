import React from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import axios from 'axios';

const StripeCheckoutForm = ({ customerId }) => {
    //const dispatch = useDispatch();
    const { userDetails, intentClientSecret } = useSelector((state) => state.createAccount);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000' // this needs to be the replaced
            }
        });

        if (error) {
            console.error(error);
        } else {
            const response = await axios.post('/stripe/api/users/register-new-user/attach-payment-method', {
                customerId,
                intentClientSecret,
                subscriptionPlan: userDetails.subscriptionPlan
            });

            if (response.data.success) {
                console.log('Payment method attached and subscription created!');
                // handle successful payment and subscription creation
            } else {
                console.log('Payment method not attached');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
        </form>
    );
};
import PropTypes from 'prop-types';

StripeCheckoutForm.propTypes = {
    customerId: PropTypes.string.isRequired
};

export default StripeCheckoutForm;
