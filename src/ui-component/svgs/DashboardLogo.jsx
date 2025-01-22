import React from 'react';
import { Box } from '@mui/material';
import homePageLogo from 'assets/fiver/SVG Vector Files/Transparent Logo.svg';

const DashboardLogo = () => {
    return (
        <Box display="flex" width="95%" height="95%">
            <img src={homePageLogo} alt="Timekeeper logo" style={{ width: '100%', height: '100%' }} />
        </Box>
    );
};

export default DashboardLogo;
