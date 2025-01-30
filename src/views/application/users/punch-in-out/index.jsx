import { Button, Grid } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { useEffect, useState } from 'react';
import { PUNCH_IN } from 'src/store/actions';
import { performPunchIn, performPunchOut } from 'src/store/slices/punchInOut';
import PunchInOutDialog from '../../../../ui-component/dialogs/PunchInOutDialog';
import { useTheme } from '@mui/material/styles';

const PunchInOut = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [openPunchInOutDialog, setOpenPunchInOutDialog] = useState(false);
    const punchInOut = useSelector((state) => state.punchInOut);
    const action = punchInOut.punchActionToPerform;
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            month: 'numeric',
            year: 'numeric',
            day: 'numeric'
        })
    );

    const performAction = () => {
        if (action === PUNCH_IN) {
            dispatch(performPunchIn());
        } else {
            dispatch(performPunchOut());
        }
    };

    const handleClosePunchInOutDialog = () => {
        setOpenPunchInOutDialog(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(
                new Date().toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                })
            );
        }, 60000); // Update every minute

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <h1>
                    <FormattedMessage id="currentTime"></FormattedMessage>
                </h1>
                <h2>{currentTime}</h2>
            </Grid>
            {openPunchInOutDialog && (
                <PunchInOutDialog
                    open={openPunchInOutDialog}
                    handleClose={handleClosePunchInOutDialog}
                    action={action}
                    handleOK={performAction} // eslint-disable-line no-empty-function
                />
            )}
            <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '8vh' }}>
                <Button
                    variant="contained"
                    size={'large'}
                    sx={{
                        background:
                            punchInOut.punchActionToPerform === PUNCH_IN
                                ? theme.palette.customBackground.tmkOrange
                                : theme.palette.customBackground.tmkPurpleDark
                    }}
                    onClick={() => setOpenPunchInOutDialog(true)}
                >
                    {punchInOut.punchActionToPerform === PUNCH_IN ? <FormattedMessage id="punchIn" /> : <FormattedMessage id="punchOut" />}
                </Button>
            </Grid>
        </Grid>
    );
};

export default PunchInOut;
