import React from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { Button } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import EventNoteIcon from '@mui/icons-material/EventNote';
import { FormattedMessage } from 'react-intl';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.ligth
    // ... include any other styles you need from the TotalIncomeLightCard
}));

// ==============================|| DASHBOARD - GREETING CARD ||============================== //

const GreetingCard = ({ userName }) => {
    const theme = useTheme();
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
                            <Typography
                                variant="h5"
                                sx={{ color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.secondary[200] }}
                            >
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
                            <Button variant="contained">Punch In</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </CardWrapper>
    );
};

export default GreetingCard;
