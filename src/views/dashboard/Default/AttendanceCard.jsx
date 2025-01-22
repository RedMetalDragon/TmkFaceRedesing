import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Grid, Typography, LinearProgress, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';


// ==============================|| ATTENDANCE CARD ||============================== //

const ColumnStat = ({ title, percentage, workedHours }) => {
    const theme = useTheme();
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
            <LinearProgress
                variant="determinate"
                value={percentage}
                sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: theme.palette.customBackground.tmkGreen,
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: theme.palette.customBackground.tmkYellow
                    }
                }}
            />
        </Box>
    );
};

ColumnStat.propTypes = {
    title: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired, // Percentage for the bar
    workedHours: PropTypes.number.isRequired // Hours worked
};

const AttendanceCard = ({ isLoading }) => {
    const data = [
        { title: 'Worked Hours', workedHours: 40, percentage: 80 },
        { title: 'Overtime', workedHours: 5, percentage: 50 },
        { title: 'Break Hours', workedHours: 2, percentage: 20 }
    ];

    return (
        <>
            {isLoading && <LinearProgress />}
            <MainCard>
                <Grid container spacing={3}>
                    {data.map((item, index) => (
                        <Grid key={index} item xs={12} sm={4}>
                            <ColumnStat title={item.title} percentage={item.percentage}
                                        workedHours={item.workedHours} />
                        </Grid>
                    ))}
                </Grid>
            </MainCard>
        </>
    );
};

export default AttendanceCard;
