import React from 'react';
import { Button, Stack } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'store';
import { setCurrentStep } from 'store/slices/createAccount';

const StripeCheckoutForm = () => {
    //const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const currentStep = useSelector((state) => state.createAccount.currentStep);
    const dispatch = useDispatch();

    const handleBack = () => {
        // TODO
        dispatch(setCurrentStep(currentStep - 1));
    };
    const handleSubmit = async (event) => {
        const urlToReturn = import.meta.env.VITE_APP_BASE_NAME;
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: urlToReturn || '#' // this needs to be the replaced
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

export default StripeCheckoutForm;
