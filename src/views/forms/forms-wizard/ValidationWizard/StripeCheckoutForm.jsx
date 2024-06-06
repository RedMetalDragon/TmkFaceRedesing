import React from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const StripeCheckoutForm = () => {
    //const dispatch = useDispatch();
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
        //TODO handle error properly showing an error dialog or something
        if (error) {
            console.log(error);
        } else {
            // handle successful payment and subscription creation
        }
        // await stripe
        //     .confirmSetup({
        //         elements,
        //         confirmParams: {
        //             return_url: 'http://localhost:3000' // this needs to be the replaced
        //         }
        //     })
        //     .then(async (result) => {
        //         if (result.error) {
        //             console.log(result.error);
        //         } else {
        //             console.log('TEST');
        //             const paymentMethodId = setupIntent.payment_method;
        //             await axios
        //                 .post('/stripe/api/users/register-new-user/attach-payment-method', {
        //                     customerId,
        //                     paymentMethodId,
        //                     subscriptionPlan: userDetails.subscriptionPlan
        //                 })
        //                 .then((response) => {
        //                     if (response.data.success) {
        //                         console.log('Payment method attached and subscription created!');
        //                         // handle successful payment and subscription creation
        //                     } else {
        //                         console.log('Payment method not attached');
        //                     }
        //                 });
        //         }
        //     });
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};
import PropTypes from 'prop-types';

StripeCheckoutForm.propTypes = {
    customerId: PropTypes.string.isRequired
};

export default StripeCheckoutForm;
