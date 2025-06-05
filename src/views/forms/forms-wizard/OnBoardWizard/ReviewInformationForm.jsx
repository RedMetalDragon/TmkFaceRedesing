import PropTypes from 'prop-types';
import { Button, Stack, Typography, Checkbox, FormControlLabel, Paper, Divider } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';

const ReviewInformationForm = ({ companyInfo, departments, primaryAdmin, policy, verified, setVerified, handleNext, setErrorIndex }) => {
    const handleCheckbox = (e) => {
        setVerified(e.target.checked);
    };

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Review & Confirm Information
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1">Company Information</Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography>Name: {companyInfo.name}</Typography>
                <Typography>Industry: {companyInfo.industry}</Typography>
                <Typography>Address: {companyInfo.address}</Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1">Departments</Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography>{departments && departments.length > 0 ? departments.join(', ') : 'No departments added.'}</Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1">Primary Administrator</Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography>
                    Name: {primaryAdmin.firstName} {primaryAdmin.lastName}
                </Typography>
                <Typography>Email: {primaryAdmin.email}</Typography>
                <Typography>Job Title: {primaryAdmin.jobTitle}</Typography>
                <Typography>Phone: {primaryAdmin.phone}</Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1">HR Policies</Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography>Working Hours: {policy.workingHours}</Typography>
                <Typography>Probation Period: {policy.probationPeriod}</Typography>
                <Typography>PTO Policy: {policy.ptoPolicy}</Typography>
                <Typography>Allow Work From Home: {policy.allowWorkFromHome ? 'Yes' : 'No'}</Typography>
            </Paper>
            <FormControlLabel
                control={<Checkbox checked={verified} onChange={handleCheckbox} color="primary" />}
                label="I have reviewed and confirm that the above information is correct."
            />
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <AnimateButton>
                    <Button variant="outlined" sx={{ my: 3 }} onClick={() => handleBack()}>
                        Back
                    </Button>
                </AnimateButton>
                <AnimateButton>
                    <Button
                        variant="contained"
                        sx={{ my: 3 }}
                        onClick={() => {
                            setErrorIndex(0);
                            handleNext();
                        }}
                        disabled={!verified}
                    >
                        Finish
                    </Button>
                </AnimateButton>
            </Stack>
        </>
    );
};

ReviewInformationForm.propTypes = {
    companyInfo: PropTypes.object,
    departments: PropTypes.array,
    primaryAdmin: PropTypes.object,
    policy: PropTypes.object,
    verified: PropTypes.bool,
    setVerified: PropTypes.func,
    handleNext: PropTypes.func,
    setErrorIndex: PropTypes.func
};

export default ReviewInformationForm;

// Example usage:
// import { useDispatch, useSelector } from 'react-redux';
// import { setVerified } from 'store/slices/onBoardCompanyRegistration';
//
// const dispatch = useDispatch();
// const { companyInfo, departments, primaryAdmin, policy, verified } = useSelector((state) => state.onBoardCompanyRegistration);
//
// <ReviewInformationForm
//   companyInfo={companyInfo}
//   departments={departments}
//   primaryAdmin={primaryAdmin}
//   policy={policy}
//   verified={verified}
//   setVerified={(val) => dispatch(setVerified(val))}
//   handleNext={...}
//   setErrorIndex={...}
// />
