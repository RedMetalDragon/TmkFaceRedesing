import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
    setCurrentStep,
    setCompanyInfo,
    setDepartments,
    setPrimaryAdmin,
    setPolicy,
    setVerified
} from 'store/slices/onBoardCompanyRegistration';
import CompanyAddressForm from './CompanyAddressForm';
import OrganizationStructureForm from './OrganizationStructureForm';
import PrimaryAdminForm from './PrimaryAdminForm';
import HRPoliciesForm from './HRPoliciesForm';
import ReviewInformationForm from './ReviewInformationForm';
import { Box, Step, StepLabel, Stepper, Paper, Button, Grid } from '@mui/material';
import HeaderForm from './HeaderForm';
import { useTheme } from '@emotion/react';
import MainCard from 'ui-component/cards/MainCard';

// Step options for the onboarding wizard
const steps = ['Company Info', 'Departments', 'Primary Admin', 'HR Policies', 'Review'];

// It could be used to dynamically render the content of each step based on the current step index.
// Uncomment the following function if you want to use it instead of inline rendering in the return statement.
// const getStepContent = (step, handleNext, handleBack, setErrorIndex) => {
//     switch (step) {
//         case 0:
//             return <CompanyAddressForm handleNext={handleNext} setErrorIndex={setErrorIndex}></CompanyAddressForm>
//         case 1:
//             return <OrganizationStructureForm handleNext={handleNext} setErrorIndex={setErrorIndex}></OrganizationStructureForm>
//         case 2:
//             return <PrimaryAdminForm handleNext={handleNext} setErrorIndex={setErrorIndex}></PrimaryAdminForm>
//         case 3:
//             return <HRPoliciesForm handleNext={handleNext} setErrorIndex={setErrorIndex}></HRPoliciesForm>
//         case 4:
//             return <ReviewInformationForm handleNext={handleNext} setErrorIndex={setErrorIndex}></ReviewInformationForm>
//         default:
//             throw new Error('Unknown step');
// }

// Example dropdown options (replace with your real data)

const industries = [
    { value: 'tech', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'health', label: 'Healthcare' }
];
const workingHoursOptions = [
    { value: '9-5', label: '9am - 5pm' },
    { value: 'flex', label: 'Flexible' }
];
const probationOptions = [
    { value: '3m', label: '3 Months' },
    { value: '6m', label: '6 Months' }
];
const ptoOptions = [
    { value: 'standard', label: 'Standard PTO' },
    { value: 'unlimited', label: 'Unlimited PTO' }
];

const OnBoardWizard = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { currentStep, companyInfo, departments, primaryAdmin, policy, verified } = useSelector(
        (state) => state.onBoardCompanyRegistration
    );
    const [errorIndex, setErrorIndex] = useState(-1);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            dispatch(setCurrentStep(currentStep + 1));
        } else {
            // Final submit logic here
            // dispatch(resetOnBoarding());
        }
    };
    // eslint-disable-next-line no-unused-vars
    const handleBack = () => {
        if (currentStep > 0) {
            dispatch(setCurrentStep(currentStep - 1));
        }
    };

    return (
        <>
            <HeaderForm message="" />
            <MainCard
                title="Complete the steps to onboard your company"
                sx={{ width: '100%', maxWidth: 1200, margin: '0 auto', p: 3, textAlign: 'center' }}
            >
                <Paper sx={{ p: 3, maxWidth: 700, margin: '0 auto' }}>
                    <Stepper activeStep={currentStep} alternativeLabel sx={{ mb: 3 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel error={errorIndex === currentStep}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Box>
                        {currentStep === 0 && (
                            <CompanyAddressForm
                                companyInfo={companyInfo}
                                setCompanyInfo={(info) => dispatch(setCompanyInfo(info))}
                                handleNext={handleNext}
                                setErrorIndex={setErrorIndex}
                                industries={industries}
                            />
                        )}
                        {currentStep === 1 && (
                            <OrganizationStructureForm
                                departments={departments}
                                setDepartments={(depts) => dispatch(setDepartments(depts))}
                                handleNext={handleNext}
                                setErrorIndex={setErrorIndex}
                            />
                        )}
                        {currentStep === 2 && (
                            <PrimaryAdminForm
                                primaryAdmin={primaryAdmin}
                                setPrimaryAdmin={(info) => dispatch(setPrimaryAdmin(info))}
                                handleNext={handleNext}
                                setErrorIndex={setErrorIndex}
                            />
                        )}
                        {currentStep === 3 && (
                            <HRPoliciesForm
                                policy={policy}
                                setPolicy={(info) => dispatch(setPolicy(info))}
                                handleNext={handleNext}
                                setErrorIndex={setErrorIndex}
                                workingHoursOptions={workingHoursOptions}
                                probationOptions={probationOptions}
                                ptoOptions={ptoOptions}
                            />
                        )}
                        {currentStep === 4 && (
                            <ReviewInformationForm
                                companyInfo={companyInfo}
                                departments={departments}
                                primaryAdmin={primaryAdmin}
                                policy={policy}
                                verified={verified}
                                setVerified={(val) => dispatch(setVerified(val))}
                                handleNext={handleNext}
                                setErrorIndex={setErrorIndex}
                            />
                        )}
                    </Box>
                    {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                            <Button disabled={currentStep === 0} onClick={handleBack} variant="outlined">Back</Button>
                        </Box>
                    */}
                </Paper>
            </MainCard>
        </>
    );
};

export default OnBoardWizard;
