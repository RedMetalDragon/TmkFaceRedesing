import React from 'react';
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
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorDialog = ({ open, onClose, onRetry, title, message, errorCode }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog open={open} onClose={onClose} fullScreen={fullScreen} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ m: 0, p: 2, pr: 6 }}>
                {title || 'Error'}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
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
                    <ErrorOutlineIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        {message || 'An error occurred while processing your request.'}
                    </Typography>
                    {errorCode && (
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                            Error code: {errorCode}
                        </Typography>
                    )}
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                        Please try again or contact support if the problem persists.
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
                {onRetry && (
                    <Button onClick={onRetry} variant="outlined" color="primary" sx={{ mr: 1 }}>
                        Try Again
                    </Button>
                )}
                <Button onClick={onClose} variant="contained" color="secondary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ErrorDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onRetry: PropTypes.func,
    title: PropTypes.string,
    message: PropTypes.string,
    errorCode: PropTypes.string
};

export default ErrorDialog;
