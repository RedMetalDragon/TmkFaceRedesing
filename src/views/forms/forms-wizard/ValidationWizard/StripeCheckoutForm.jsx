import React from 'react';
import { Button, Stack } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const StripeCheckoutForm = () => {
    //const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();

    const handleBack = () => {
        // TODO
        //dispatch(setCurrentStep(currentStep - 1));
    };
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
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <Stack direction="row" justifyContent={'space-between'}>
                <Button onClick={handleBack} sx={{ my: 3, ml: 1 }} color="secondary">
                    {'Back'}
                </Button>
                <AnimateButton>
                    <Button variant="contained" onClick={handleSubmit} sx={{ my: 3, ml: 1 }} color="secondary">
                        {'Place order'}
                    </Button>
                </AnimateButton>
            </Stack>
        </form>
    );
};
import PropTypes from 'prop-types';

StripeCheckoutForm.propTypes = {
    customerId: PropTypes.string.isRequired
};

export default StripeCheckoutForm;
