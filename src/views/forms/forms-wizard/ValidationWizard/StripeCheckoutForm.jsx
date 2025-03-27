import React from 'react';
import { Button, Stack } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'store';
import { setCurrentStep } from 'store/slices/createAccount';
import { getSuccessUrl, getErrorUrl } from 'utils/helperFunctions';

const StripeCheckoutForm = () => {
    //const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const currentStep = useSelector((state) => state.createAccount.currentStep);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleBack = () => {
        // TODO
        dispatch(setCurrentStep(currentStep - 1));
    };

    const handleError = (error) => {
        // TODO handle error properly showing an error dialog or something
        setLoading(false);
        console.log(error);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (!stripe || !elements) {
            return;
        }
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: getSuccessUrl()
            }
        });
        //TODO handle error properly showing an error dialog or something
        if (error) {
            handleError(error);
        } else {
            // handle successful payment and subscription creation
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <Stack direction="row" justifyContent={'space-between'}>
                <Button onClick={handleBack} sx={{ my: 3, ml: 1 }} color="secondary" disabled={!stripe || loading}>
                    {'Back'}
                </Button>
                <AnimateButton>
                    <Button variant="contained" onClick={handleSubmit} sx={{ my: 3, ml: 1 }} color="secondary">
                        {'Make Payment'}
                    </Button>
                </AnimateButton>
            </Stack>
        </form>
    );
};

export default StripeCheckoutForm;
