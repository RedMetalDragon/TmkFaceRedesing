import React from 'react';
import { useDispatch, useSelector } from 'store';

// material-ui
import { Step, Stepper, StepLabel, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import RegisterForm from './RegisterForm';
import { setCurrentStep } from 'store/slices/createAccount';
import SubscriptionPlanForm from './SubscriptionPlanForm';
import { StripeWrapper } from './StripeWrapper';

// step options
const steps = ['User Credentials', 'Select Subscription', 'Payment Details'];

const getStepContent = (step, handleNext, handleBack, setErrorIndex) => {
    switch (step) {
        case 0:
            return <RegisterForm handleNext={handleNext} setErrorIndex={setErrorIndex} />;
        case 1:
            return <SubscriptionPlanForm handleNext={handleNext} handleBack={handleBack} />;
        case 2:
            return <StripeWrapper />;
        default:
            throw new Error('Unknown step');
    }
};

// ==============================|| FORMS WIZARD - VALIDATION ||============================== //

const ValidationWizard = () => {
    const dispatch = useDispatch();
    const { currentStep } = useSelector((state) => state.createAccount);
    const [errorIndex, setErrorIndex] = React.useState(null);

    const handleNext = () => {
        dispatch(setCurrentStep(currentStep + 1));
    };

    const handleBack = () => {
        dispatch(setCurrentStep(currentStep - 1));
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
            {currentStep === steps.length ? (
                <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                    Thank you for registering with us.
                </Typography>
            ) : (
                getStepContent(currentStep, handleNext, handleBack, setErrorIndex)
            )}
        </MainCard>
    );
};

export default ValidationWizard;
