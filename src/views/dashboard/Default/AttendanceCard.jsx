import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Grid, Typography, LinearProgress, Box, ThemeProvider } from '@mui/material';
import { useTheme, createTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| ATTENDANCE CARD ||============================== //

const ColumnStat = ({ title, percentage, workedHours, color, backgroundColor }) => {
    const overridedTheme = createTheme({
        components: {
            MuiLinearProgress: {
                styleOverrides: {
                    root: {
                        backgroundColor: backgroundColor,
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: color
                        },
                        height: 10, // Increased height for visibility
                        borderRadius: 5 // Rounded corners
                    }
                }
            }
        }
    });

    return (
        <Box textAlign="center">
            {/* Title */}
            <Typography variant="subtitle1" color="textSecondary">
                {title}
            </Typography>

            {/* Worked Hours */}
            <Typography variant="h4" sx={{ mt: 1, mb: 1 }}>
                {workedHours} hrs
            </Typography>

            {/* Bar */}
            <ThemeProvider theme={overridedTheme}>
                <LinearProgress variant="determinate" value={percentage} />
            </ThemeProvider>
        </Box>
    );
};

ColumnStat.propTypes = {
    title: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired, // Percentage for the bar
    workedHours: PropTypes.number.isRequired, // Hours worked
    color: PropTypes.string.isRequired, // Color for the progress bar
    backgroundColor: PropTypes.string.isRequired // Background color for the progress bar
};

const AttendanceCard = ({ isLoading }) => {
    const theme = useTheme();
    const data = [
        {
            title: 'Worked Hours',
            workedHours: 40,
            percentage: 80,
            color: theme.palette.solids.tmkPurple,
            backgroundColor: theme.palette.solids.tmkPurpleLigth
        },
        {
            title: 'Overtime',
            workedHours: 5,
            percentage: 50,
            color: theme.palette.solids.tmkGreen,
            backgroundColor: theme.palette.solids.tmkGreenLigth
        },
        {
            title: 'Break Hours',
            workedHours: 2,
            percentage: 20,
            color: theme.palette.solids.tmkOrange,
            backgroundColor: theme.palette.solids.tmkOrangeLigth
        }
    ];

    return (
        <>
            {isLoading && <LinearProgress />}
            <MainCard>
                <Grid container spacing={3}>
                    {data.map((item, index) => (
                        <Grid key={index} item xs={12} sm={4}>
                            <ColumnStat
                                title={item.title}
                                percentage={item.percentage}
                                workedHours={item.workedHours}
                                color={item.color}
                                backgroundColor={item.backgroundColor}
                            />
                        </Grid>
                    ))}
                </Grid>
            </MainCard>
        </>
    );
};

export default AttendanceCard;
