import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
//import PropTypes from 'prop-types';

const RestrictedAccessDialog = () => {
    const navigate = useNavigate();
    const handleGoback = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };
    return (
        <Dialog open={true}>
            <DialogTitle>Restricted Access</DialogTitle>
            <DialogContent>
                <DialogContentText>You do not have permission to access this page.</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleGoback} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// RestrictedAccessDialog.propTypes = {
//     open: PropTypes.bool.isRequired,
//     onClose: PropTypes.func.isRequired
// };

export default RestrictedAccessDialog;
