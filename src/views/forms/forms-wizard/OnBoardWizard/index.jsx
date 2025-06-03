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
import CompanyAddressForm from '../ValidationWizard/CompanyAddressForm';
import OrganizationStructureForm from '../ValidationWizard/OrganizationStructureForm';
import PrimaryAdminForm from '../ValidationWizard/PrimaryAdminForm';
import HRPoliciesForm from '../ValidationWizard/HRPoliciesForm';
import ReviewInformationForm from '../ValidationWizard/ReviewInformationForm';
import { Box, Step, StepLabel, Stepper, Paper, Button } from '@mui/material';

const steps = ['Company Info', 'Departments', 'Primary Admin', 'HR Policies', 'Review'];

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
    const handleBack = () => {
        if (currentStep > 0) {
            dispatch(setCurrentStep(currentStep - 1));
        }
    };

    return (
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button disabled={currentStep === 0} onClick={handleBack} variant="outlined">
                    Back
                </Button>
            </Box>
        </Paper>
    );
};

export default OnBoardWizard;
