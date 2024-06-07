import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'store';

// material-ui
import { Button, Step, Stepper, StepLabel, Stack, Typography } from '@mui/material';

// project imports
//import AddressForm from './AddressForm';
//import Review from './Review';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import RegisterForm from './RegisterForm';
import { setCurrentStep } from 'store/slices/createAccount';
import SubscriptionPlanForm from './SubscriptionPlanForm';
import { StripeWrapper } from './StripeWrapper';
// step options
const steps = ['User Credentials', 'Select Subscription', 'Payment Details'];

const getStepContent = (step, handleNext, handleBack, setErrorIndex) => {
    switch (step) {
        case 0:
            return <RegisterForm handleNext={handleNext} setErrorIndex={setErrorIndex}></RegisterForm>;
        case 1:
            return <SubscriptionPlanForm handleNext={handleNext} handleBack={handleBack}></SubscriptionPlanForm>;
        case 2:
            return <StripeWrapper></StripeWrapper>;
        // return <Review />;
        default:
            throw new Error('Unknown step');
    }
};

// ==============================|| FORMS WIZARD - BASIC ||============================== //

const ValidationWizard = () => {
    const dispatch = useDispatch();
    const currentStep = useSelector((state) => state.createAccount.currentStep);
    // const isSubmitting = useSelector((state) => state.createAccount.isSubmitting);
    // const error = useSelector((state) => state.createAccount.error);
    const [shippingData, setShippingData] = React.useState({});
    const [paymentData, setPaymentData] = React.useState({});
    const [errorIndex, setErrorIndex] = React.useState(null);

    useEffect(() => {}, []);

    const handleNext = () => {
        dispatch(setCurrentStep(currentStep + 1));
    };

    const handleBack = () => {
        dispatch(setCurrentStep(currentStep - 1));
    };

    //eslint-disable-next-line
    const handleReset = () => {
        dispatch(resetForm());
    };

    return (
        <MainCard title="Register" sx={{ width: '100%' }}>
            <Stepper activeStep={currentStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label, index) => {
                    const labelProps = {};

                    if (index === errorIndex) {
                        labelProps.optional = (
                            <Typography variant="caption" color="error">
                                Error
                            </Typography>
                        );

                        labelProps.error = true;
                    }

                    return (
                        <Step key={label}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <>
                {currentStep === steps.length ? (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                            Your order number is #2001539. We have emailed your order confirmation, and will send you an update when your
                            order has shipped.
                        </Typography>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                        setShippingData({});
                                        setPaymentData({});
                                        setActiveStep(0);
                                    }}
                                    sx={{ my: 3, ml: 1 }}
                                >
                                    Reset
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </>
                ) : (
                    <>
                        {getStepContent(
                            currentStep,
                            handleNext,
                            handleBack,
                            setErrorIndex,
                            shippingData,
                            setShippingData,
                            paymentData,
                            setPaymentData
                        )}
                        {/* {currentStep === steps.length - 1 && (
                            <Stack direction="row" justifyContent={currentStep !== 0 ? 'space-between' : 'flex-end'}>
                                {currentStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ my: 3, ml: 1 }} color="secondary">
                                        Back
                                    </Button>
                                )}
                                <AnimateButton>
                                    <Button variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }} color="secondary">
                                        {currentStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        )} */}
                    </>
                )}
            </>
        </MainCard>
    );
};

export default ValidationWizard;
