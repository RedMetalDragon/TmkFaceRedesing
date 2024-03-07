import PropTypes from 'prop-types';
import React from 'react';
// third-party
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { nextSlide } from 'store/slices/contentFeeder';
import { useSelector } from 'store';
import { Typography } from '@mui/material';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.ligth,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative'
}));

// ===========================|| DASHBOARD DEFAULT - CAROUSEL||=========================== //

const CarouselCard = () => {
    //eslint-disable-next-line
    const theme = useTheme();
    const contentFeeder = useSelector((state) => state.contentFeeder);
    const { images, text, currentText } = contentFeeder;

    return (
        <CardWrapper border={true} content={true}>
            <Box sx={{ p: 0 }}>
                <Grid container direction="row" spacing={1}>
                    <Grid
                        item
                        xs={12}
                        lg={6}
                        md={6}
                        sm={6}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyItems: 'center',
                            justifyContent: 'center',
                            minWidth: '160px',
                            minHeight: '160px'
                        }}
                    >
                        <Carousel fade onSelect={nextSlide}>
                            {images.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img src={image} alt="test" />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        lg={6}
                        md={6}
                        sm={6}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyItems: 'end',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography
                            level={3}
                            sx={{
                                alignItems: 'center',
                                textAlign: 'center',
                                justifyContent: 'end',
                                justifySelf: 'end',
                                fontSize: '1.0rem',
                                height: 'auto',
                                width: 'auto',
                                minHeight: '86px',
                                maxHeight: '200px',
                                margin: '5px',
                                fontWeight: 500,
                                color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.secondary[200],
                                overflow: 'hidden'
                                // textOverflow: 'ellipsis'
                            }}
                        >
                            {text[currentText]}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </CardWrapper>
    );
};

Carousel.propTypes = {
    isLoading: PropTypes.bool
};

export default CarouselCard;
