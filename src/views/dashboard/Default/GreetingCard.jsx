import React from 'react';
import PropTypes from 'prop-types';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useSelector } from 'store';
import { PUNCH_IN } from 'store/actions';
import { FormattedMessage } from 'react-intl';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// assets
import EventNoteIcon from '@mui/icons-material/EventNote';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.ligth
    // ... include any other styles you need from the TotalIncomeLightCard
}));

// ==============================|| DASHBOARD - GREETING CARD ||============================== //

const GreetingCard = ({ userName, setModalOpen }) => {
    const theme = useTheme();
    const punchInOut = useSelector((state) => state.punchInOut);
    const openModal = () => {
        setModalOpen(true);
    };

    //eslint-disable-next-line
    const todayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const currentHour = new Date().getHours();
    const minHeight = '44px';
    let greeting;

    if (currentHour < 12) {
        greeting = 'morning';
    } else if (currentHour < 18) {
        greeting = 'afternoon';
    } else {
        greeting = 'evening';
    }

    return (
        <CardWrapper content={true} border={true}>
            <Box sx={{ pl: 0 }}>
                <Grid container spacing={0} sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Grid item xs={8} sx={{ justifyContent: 'flex-start' }}>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                minHeight: minHeight
                            }}
                        >
                            <Avatar
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.largeAvatar,
                                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                                    color: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
                                    marginRight: theme.spacing(2)
                                }}
                            >
                                <EventNoteIcon fontSize="inherit" />
                            </Avatar>
                            <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
                                <FormattedMessage id={`greeting-${greeting}`} />
                                {userName}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center', alignContent: 'flex-start' }}
                    >
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                minHeight: minHeight
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    background:
                                        punchInOut.punchActionToPerform === PUNCH_IN
                                            ? theme.palette.customBackground.tmkOrange
                                            : theme.palette.customBackground.tmkRedLigth
                                }}
                                onClick={() => openModal()}
                            >
                                {punchInOut.punchActionToPerform === PUNCH_IN ? (
                                    <FormattedMessage id="punchIn" />
                                ) : (
                                    <FormattedMessage id="punchOut" />
                                )}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </CardWrapper>
    );
};
GreetingCard.propTypes = {
    userName: PropTypes.string,
    setModalOpen: PropTypes.func
};
export default GreetingCard;
