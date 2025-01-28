import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide, Typography } from '@mui/material';
import { PUNCH_IN, PUNCH_OUT } from 'store/actions';
import { useTheme } from '@mui/material/styles';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
// ===============================|| UI DIALOG - PUNCH IN|OUT ANIMATION ||=============================== //

const PunchInOutDialog = ({ open, handleClose, handleOK, action }) => {
    const theme = useTheme();
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    // date and time without seconds
    const currentDateTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });

    const getDialogContentText = () => {
        if (action === PUNCH_IN) {
            return `Are you sure you want to punch in at ${currentDateTime}?`;
        } else if (action === PUNCH_OUT) {
            return 'Are you sure you want to punch out?';
        }
        return '';
    };

    return (
        <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted>
            <DialogTitle>{action === PUNCH_IN ? 'Punch In' : 'Punch Out'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography variant="body2">{getDialogContentText()}</Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ pr: 2.5 }}>
                <Button
                    sx={{ color: theme.palette.error.dark, borderColor: theme.palette.error.dark }}
                    onClick={handleClose}
                    color="secondary"
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    disabled={isButtonDisabled}
                    size="small"
                    onClick={() => {
                        setButtonDisabled(true);
                        handleOK();
                        handleClose();
                    }}
                    sx={{
                        background:
                            action === PUNCH_IN ? theme.palette.customBackground.tmkOrange : theme.palette.customBackground.tmkPurpleDark
                    }}
                >
                    {action === PUNCH_IN ? 'Punch In' : 'Punch Out'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

PunchInOutDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleOK: PropTypes.func.isRequired,
    action: PropTypes.oneOf([PUNCH_IN, PUNCH_OUT]).isRequired
};

export default PunchInOutDialog;
