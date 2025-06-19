import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    useMediaQuery,
    useTheme,
    IconButton,
    Link,
    CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OtpInput from './OtpInput';
import axios from 'utils/axios';

const OtpVerification = ({ open, onClose, onVerify, email, onResend }) => {
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleVerify = async () => {
        if (verificationCode.length !== 6) {
            setError('Please enter a 6-digit code');
            return;
        }
        setIsSubmitting(true);
        // Mock API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        //REMOVE lines below when integrating with actual API
        setVerificationCode('');
        setError('');
        onVerify();
        // END REMOVE

        // try {
        //     axios
        //         .post('/core/account-verification/verify', {
        //             email: email,
        //             code: verificationCode
        //         })
        //         .then((resp) => {
        //             if (resp.status === 200) {
        //                 setVerificationCode('');
        //                 setError('');
        //                 onVerify();
        //             }
        //         })
        //         .catch((err) => {
        //             console.error('Error resending verification code:', err);
        //             setError('Failed to resend verification code. Please try again later.');
        //         });
        // } catch (err) {
        //     console.error('Error resending verification code:', err);
        //     setError('Failed to resend verification code. Please try again later.');
        // }
    };

    const handleResend = async () => {
        setIsResending(true);
        // Clear the verification code immediately
        setVerificationCode('');
        setError('');

        // Mock API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsResending(false);
        if (onResend) onResend();
    };

    // Reset state when modal closes
    const handleClose = () => {
        setVerificationCode('');
        setError('');
        setIsSubmitting(false);
        setIsResending(false);
        onClose();
    };

    // Clear verification code when modal opens
    useEffect(() => {
        if (open) {
            setVerificationCode('');
            setError('');
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={handleClose} fullScreen={fullScreen} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ m: 0, p: 2, pr: 6 }}>
                Email Verification
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body1" gutterBottom>
                        An email to verify your account has been sent to <strong>{email}</strong>. Enter the six digit code to verify your
                        email.
                    </Typography>
                    <Box sx={{ my: 4 }}>
                        <OtpInput
                            value={verificationCode}
                            onChange={(value) => {
                                setVerificationCode(value);
                                setError('');
                            }}
                        />
                        {error && (
                            <Typography color="error" variant="caption" sx={{ mt: 2, display: 'block' }}>
                                {error}
                            </Typography>
                        )}
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                        Didn&apos;t receive the email?{' '}
                        <Link
                            component="button"
                            variant="body2"
                            onClick={handleResend}
                            sx={{ textDecoration: 'none' }}
                            disabled={isResending}
                        >
                            {isResending ? 'Sending...' : 'Click to resend'}
                        </Link>
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
                <Button onClick={handleVerify} variant="contained" color="secondary" disabled={isSubmitting} sx={{ minWidth: 100 }}>
                    {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Verify'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

OtpVerification.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onVerify: PropTypes.func.isRequired,
    onResend: PropTypes.func,
    email: PropTypes.string.isRequired
};

export default OtpVerification;
