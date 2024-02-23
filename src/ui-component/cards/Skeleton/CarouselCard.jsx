import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { styled } from '@mui/material/styles';

//eslint-disable-next-line
const CardWrapper = styled(MainCard)(({ theme }) => ({
    // ... Include styles that match the CarouselCard for consistent dimensions
    // For example, if your CarouselCard has a fixed height, make sure to include that here.
}));

const SkeletonCarouselCard = () => {
    return (
        <CardWrapper>
            <Box sx={{ p: 0, height: '100%', width: '100%' }}>
                {' '}
                {/* Adjust padding and height to match CarouselCard */}
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Skeleton variant="rectangular" width="100%" height="100%" />{' '}
                        {/* Adjust width and height to match image size in CarouselCard */}
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0px' }}>
                        {/* <Skeleton variant="text" sx={{ fontSize: '1rem', height: '148', mb: 1 }} /> */}
                        {/* Text skeleton */}
                        {/* Add as many text skeletons as needed, adjust height to match typical text height in CarouselCard */}
                    </Grid>
                </Grid>
            </Box>
        </CardWrapper>
    );
};

export default SkeletonCarouselCard;
