// material-ui
import { Grid, Typography } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// project imports
import RootAccountCreationWizard from './RootAccountCreationWizard';
import { gridSpacing } from 'store/constant';
import RegisterFormLogo from 'ui-component/svgs/RegisterFormLogo';

// ==============================|| FORMS WIZARD ||============================== //

const FormsWizard = () => {
    return (
        <Grid container spacing={gridSpacing} justifyContent="center">
            <Grid item xs={12} md={9} lg={7} display={'flex'} justifyContent={'center'} flexWrap={'nowrap'}>
                <Grid container spacing={gridSpacing} justifyContent="center" display={'flex'} flexDirection={'row'}>
                    <Grid item xs={12} md={6} lg={5} display={'flex'} justifyContent={'center'}>
                        <RegisterFormLogo />
                    </Grid>
                    <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                        <Typography
                            variant="h4"
                            sx={{
                                display: 'flex'
                            }}
                        >
                            Let&apos;s get started
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={9} lg={7}>
                <RootAccountCreationWizard />
            </Grid>
        </Grid>
    );
};

export default FormsWizard;