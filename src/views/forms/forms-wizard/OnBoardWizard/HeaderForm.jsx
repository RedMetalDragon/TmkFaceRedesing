import PropTypes from 'prop-types';
import { Grid, Typography, } from '@mui/material';
import RegisterFormLogo from 'ui-component/svgs/RegisterFormLogo';

const HeaderForm = ({ message, gridSpacing = 2 }) => {
    // Render the header for the form with a logo and a message
    return (
        <Grid container spacing={gridSpacing} justifyContent="center">
            <Grid item xs={12} md={9} lg={7} display={'flex'} justifyContent={'center'} flexWrap={'nowrap'}>
                <Grid container spacing={gridSpacing} justifyContent="center" display={'flex'} flexDirection={'row'}>
                    <Grid item xs={12} md={6} lg={5} display={'flex'} justifyContent={'center'}>
                        <RegisterFormLogo />
                    </Grid>
                    <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                        <Typography variant="h4" sx={{ display: 'flex' }}>
                            {message}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

HeaderForm.propTypes = {
    message: PropTypes.string.isRequired,
    gridSpacing: PropTypes.number
};

export default HeaderForm;
