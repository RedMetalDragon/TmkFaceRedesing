import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

import PropTypes from 'prop-types';

const RestrictedAccessDialog = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Restricted Access</DialogTitle>
            <DialogContent>
                <DialogContentText>You do not have permission to access this page.</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

RestrictedAccessDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default RestrictedAccessDialog;
