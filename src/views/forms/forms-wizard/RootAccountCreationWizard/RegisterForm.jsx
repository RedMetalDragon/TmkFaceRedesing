import React, { useEffect, useState } from 'react';
//eslint-disable-next-line
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery,
    CircularProgress
} from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DateRangeIcon from '@mui/icons-material/DateRange';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import { requestEmailVerificationCode } from 'store/slices/createAccount';
//import useScriptRef from 'hooks/useScriptRef';
import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';
import { useDispatch, useSelector } from 'store';
import Loader from 'ui-component/Loader';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { setUserDetails, resetForm } from 'store/slices/createAccount';
import OtpVerification from './OtpVerification';
import ErrorDialog from './ErrorDialog';

// ===========================|| FORM WIZARD - VALIDATION 1 ||=========================== //

//eslint-disable-next-line
const RegisterForm = ({ handleNext, setErrorIndex }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    //eslint-disable-next-line
    const { userDetails, isSubmitting, error } = useSelector((state) => state.createAccount);
    //const navigate = useNavigate();
    //const scriptedRef = useScriptRef();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [passwordMismatch, setPasswordMismatch] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState();
    const [verificationModalOpen, setVerificationModalOpen] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [errorDetails, setErrorDetails] = useState({ title: '', message: '', code: '' });
    const [isSubmittingForm, setIsSubmittingForm] = useState(false);
    const [submissionAttempted, setSubmissionAttempted] = useState(false);
    //eslint-disable-next-line
    const { register } = useAuth();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicatorNumFunc(value);
        setStrength(temp);
        setLevel(strengthColor(temp));

        // Check if confirm password matches when password changes
        if (confirmPassword) {
            setPasswordMismatch(confirmPassword !== value);
        }
    };
    useEffect(() => {
        // Simulate three seconds loading
        // eslint-disable-next-line no-unused-vars
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    useEffect(() => {
        if (submissionAttempted && !isSubmitting) {
            if (!error) {
                setVerificationModalOpen(true);
            } else {
                setIsSubmittingForm(false); // Reset button loading state on API error
            }
        }
    }, [isSubmitting, error, dispatch, submissionAttempted]);

    // Show error dialog when Redux store has an error
    useEffect(() => {
        if (error && !errorDialogOpen && !isSubmitting) {
            // Extract error details from the Redux store error
            let errorMessage = 'An error occurred while sending the verification email.';
            let errorCode = '';

            if (error === 'Network Error') {
                errorMessage = 'Unable to connect to the server. Please check your internet connection.';
                errorCode = 'NETWORK_ERROR';
            } else if (error.includes('503')) {
                errorMessage = 'The verification service is currently unavailable.';
                errorCode = '503';
            } else if (error.includes('429')) {
                errorMessage = 'Too many requests. Please try again later.';
                errorCode = '429';
            }

            setErrorDetails({
                title: 'Verification Email Error',
                message: errorMessage,
                code: errorCode
            });
            setErrorDialogOpen(true);
        }
    }, [error, errorDialogOpen, isSubmitting]);

    const handleVerificationSuccess = () => {
        setVerificationModalOpen(false);
        setSubmissionAttempted(false);
        handleNext();
    };

    const handleCloseVerification = () => {
        setVerificationModalOpen(false);
        setSubmissionAttempted(false);
        dispatch(resetForm());
    };

    const handleResendCode = () => {
        // TODO: Implement resend code functionality
        // Mock resend functionality
        console.log('Resending verification code...');
    };

    const handleErrorDialogClose = () => {
        setErrorDialogOpen(false);
        // Clear the error in Redux store
        dispatch(resetForm());
    };

    const handleErrorDialogRetry = async () => {
        setErrorDialogOpen(false);
        setIsSubmittingForm(true);

        try {
            // Reset any existing errors in Redux store
            dispatch(resetForm());
            // Re-attempt verification code request
            await dispatch(requestEmailVerificationCode());
            setSubmissionAttempted(true);
        } catch (apiError) {
            console.error('Retry API error:', apiError);
            // Error will be handled by Redux and shown via useEffect
        } finally {
            setIsSubmittingForm(false);
        }
    };

    if (isSubmitting || isLoading) {
        return <Loader />;
    }
    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Register up with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            {/**TODO: Agree on terms and conditions should be validated also */}
            <Formik
                initialValues={userDetails}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                    firstName: Yup.string().max(255).required('First Name is required'),
                    lastName: Yup.string().max(255).required('Last Name is required'),
                    dateOfBirth: Yup.date()
                        .required('Date of Birth is required')
                        .test('age', 'You must be at least 18 years old', function (value) {
                            const today = new Date();
                            const birthDate = new Date(value);
                            let age = today.getFullYear() - birthDate.getFullYear();
                            const m = today.getMonth() - birthDate.getMonth();
                            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                age--;
                            }
                            return age >= 18;
                        })
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        // Check if passwords match before submitting
                        if (values.password !== confirmPassword) {
                            setPasswordMismatch(true);
                            setErrors({ submit: 'Passwords do not match' });
                            return;
                        }

                        setIsSubmittingForm(true);
                        await new Promise((resolve) => setTimeout(resolve, 500));
                        dispatch(setUserDetails(values));
                        // Only set submissionAttempted after the API call succeeds
                        try {
                            //await dispatch(requestEmailVerificationCode());
                            setSubmissionAttempted(true);
                        } catch (apiError) {
                            console.error('API error:', apiError);

                            // Show error dialog with appropriate message
                            let errorMessage = 'An error occurred while sending the verification email.';
                            let errorCode = '';

                            if (apiError.response) {
                                // Server responded with error
                                errorCode = `${apiError.response.status}`;

                                if (apiError.response.status === 503) {
                                    errorMessage = 'The verification service is currently unavailable.';
                                } else if (apiError.response.status === 429) {
                                    errorMessage = 'Too many requests. Please try again later.';
                                } else if (apiError.response.data && apiError.response.data.message) {
                                    errorMessage = apiError.response.data.message;
                                }
                            } else if (apiError.request) {
                                // Request made but no response received
                                errorMessage = 'Unable to connect to the server. Please check your internet connection.';
                                errorCode = 'NETWORK_ERROR';
                            }
                            setErrorDetails({
                                title: 'Verification Email Error',
                                message: errorMessage,
                                code: errorCode
                            });
                            setErrorDialogOpen(true);
                        } finally {
                            setIsSubmittingForm(false);
                        }
                    } catch (err) {
                        console.error(err);
                        setSubmissionAttempted(false);
                        setIsSubmittingForm(false);
                        // dispatch(hasError(err.message)); // Removed this line
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <>
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={matchDownSM ? 0 : 2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        margin="normal"
                                        name="firstName"
                                        type="text"
                                        value={values.firstName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        sx={{ ...theme.typography.customInput }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        margin="normal"
                                        name="lastName"
                                        type="text"
                                        value={values.lastName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        sx={{ ...theme.typography.customInput }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileDatePicker
                                            label="Date of Birth"
                                            value={values.dateOfBirth ? new Date(values.dateOfBirth) : null}
                                            onChange={(newValue) => {
                                                handleChange({
                                                    target: {
                                                        name: 'dateOfBirth',
                                                        value: newValue ? newValue.toISOString().split('T')[0] : ''
                                                    }
                                                });
                                            }}
                                            onBlur={() => handleBlur({ target: { name: 'dateOfBirth' } })}
                                            maxDate={new Date()}
                                            format="yyyy-MM-dd"
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    margin: 'normal',
                                                    error: Boolean(touched.dateOfBirth && errors.dateOfBirth),
                                                    helperText: touched.dateOfBirth && errors.dateOfBirth,
                                                    sx: { ...theme.typography.customInput },
                                                    InputProps: {
                                                        endAdornment: (
                                                            <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                                                                <DateRangeIcon />
                                                            </InputAdornment>
                                                        )
                                                    }
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password-register"
                                            type={showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            name="password"
                                            label="Password"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                handleChange(e);
                                                changePassword(e.target.value);
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            inputProps={{}}
                                        />
                                        {touched.password && errors.password && (
                                            <FormHelperText error id="standard-weight-helper-text-password-register">
                                                {errors.password}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={matchDownSM ? 0 : 2}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-email-register"
                                            type="email"
                                            value={values.email}
                                            name="email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            inputProps={{}}
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text--register">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth error={Boolean(passwordMismatch)} sx={{ ...theme.typography.customInput }}>
                                        <InputLabel htmlFor="outlined-adornment-confirm-password-register">Confirm Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-confirm-password-register"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            onBlur={() => {
                                                if (values.password !== confirmPassword) {
                                                    setPasswordMismatch(true);
                                                }
                                            }}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                                setPasswordMismatch(e.target.value !== values.password);
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowConfirmPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            inputProps={{}}
                                        />
                                        {passwordMismatch && (
                                            <FormHelperText error id="standard-weight-helper-text-confirm-password">
                                                Passwords do not match
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {strength !== 0 && (
                                <FormControl fullWidth>
                                    <Box sx={{ mb: 2 }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Box
                                                    style={{ backgroundColor: level?.color }}
                                                    sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle1" fontSize="0.75rem">
                                                    {level?.label}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </FormControl>
                            )}
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={(event) => setChecked(event.target.checked)}
                                                name="checked"
                                                color="primary"
                                            />
                                        }
                                        label={
                                            <Typography variant="subtitle1">
                                                Agree with &nbsp;
                                                <Typography variant="subtitle1" component={Link} to="#">
                                                    Terms & Condition.
                                                </Typography>
                                            </Typography>
                                        }
                                    />
                                </Grid>
                            </Grid>
                            {errors.submit && (
                                <Box sx={{ mt: 3 }}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Box>
                            )}

                            {/* Error is now displayed in a modal dialog */}

                            <Grid
                                container
                                spacing={2}
                                sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}
                                display={'flex'}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    sx={{
                                        flexDirection: 'row',
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                        justifySelf: 'flex-end'
                                    }}
                                >
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting || isSubmittingForm}
                                            fullWidth
                                            size="medium"
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                        >
                                            {isSubmittingForm ? <CircularProgress size={24} color="inherit" /> : 'Next'}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </form>
                        <OtpVerification
                            open={verificationModalOpen}
                            onClose={handleCloseVerification}
                            onVerify={handleVerificationSuccess}
                            onResend={handleResendCode}
                            email={values.email}
                        />
                        <ErrorDialog
                            open={errorDialogOpen}
                            onClose={handleErrorDialogClose}
                            onRetry={handleErrorDialogRetry}
                            title={errorDetails.title}
                            message={errorDetails.message}
                            errorCode={errorDetails.code}
                        />
                    </>
                )}
            </Formik>
        </>
    );
};

RegisterForm.propTypes = {
    handleNext: PropTypes.func.isRequired,
    setErrorIndex: PropTypes.func.isRequired
};

export default RegisterForm;
