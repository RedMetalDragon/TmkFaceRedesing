// material-ui
import { Grid, Typography } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// project imports
import ValidationWizard from './ValidationWizard';
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
                <ValidationWizard />
            </Grid>
        </Grid>
    );
};

export default FormsWizard;

// +-----------------+                +-------------------+                 +-------------------+                +-------------------+
// |  User Frontend  |                |      Backend      |                 |     Stripe API    |                |      Database     |
// +-----------------+                +-------------------+                 +-------------------+                +-------------------+
//          |                                  |                                      |                                |
//          | 1. User enters details           |                                      |                                |
//          +------------------------------>   |                                      |                                |
//          |                                  |                                      |                                |
//          |                                  | 2. Temporarily store user details    |                                |
//          |                                  +------------------------------->      |                                |
//          |                                  |                                      |                                |
//          |                                  |                                      |                                |
//          |                                  |                                      |                                |
//          |                                  | 3. Respond to frontend               |                                |
//          | <------------------------------+ |                                      |                                |
//          |                                  |                                      |                                |
//          |                                  |                                      |                                |
//          | 4. User selects subscription plan|                                      |                                |
//          +------------------------------>   |                                      |                                |
//          |                                  |                                      |                                |
//          |                                  | 5. Temporarily store subscription plan|                                |
//          |                                  +------------------------------->      |                                |
//          |                                  |                                      |                                |
//          |                                  |                                      |                                |
//          |                                  | 6. Respond to frontend               |                                |
//          | <------------------------------+ |                                      |                                |
//          |                                  |                                      |                                |
//          | 7. User enters payment details   |                                      |                                |
//          +------------------------------>   |                                      |                                |
//          |                                  |                                      |                                |
//          |                                  | 8. Create PaymentMethod              |                                |
//          |                                  +----------------------------->       |                                |
//          |                                  |                                      |                                |
//          |                                  |                                      | 9. Respond with PaymentMethodID |
//          | <------------------------------+ |                                      | <----------------------------+ |
//          |                                  |                                      |                                |
//          |                                  | 10. Send PaymentMethodID to backend  |                                |
//          |                                  +----------------------------->       |                                |
//          |                                  |                                      |                                |
//          |                                  | 11. Create customer and subscription |                                |
//          |                                  +----------------------------->       |                                |
//          |                                  |                                      |                                |
//          |                                  |                                      | 12. Respond with subscription  |
//          | <------------------------------+ |                                      | <----------------------------+ |
//          |                                  |                                      |                                |
//          |                                  | 13. Respond to frontend              |                                |
//          | <------------------------------+ |                                      |                                |
//          |                                  |                                      |                                |
//          |                                  |                                      |                                |
//          |                                  |                                      |                                |
//          |                                  |                                      |                                |
//          |                                  | 14. Listen to Stripe webhook events  |                                |
//          +------------------------------>   +<----------------------------->       |                                |
//          |                                  |                                      |                                |
//          |                                  | 15. Handle payment success webhook   |                                |
//          +<------------------------------+  |                                      |                                |
//          |                                  |                                      |                                |
//          |                                  |                                      | 16. Create user account in DB  |
//          |                                  +----------------------------------->  | <----------------------------+ |
//          |                                  |                                      |                                |
//          |                                  |                                      | 17. Respond to Stripe webhook  |
//          | <------------------------------+  |                                      | <----------------------------+ |
//          |                                  |                                      |                                |
//          |                                  | 18. Notify user of successful        |                                |
//          | <------------------------------+  |   registration                      |                                |
//          |                                  |                                      |                                |
//          |                                  |                                      |                                |
// +-----------------+                +-------------------+                 +-------------------+                +-------------------+
// |  User Frontend  |                |      Backend      |                 |     Stripe API    |                |      Database     |
// +-----------------+                +-------------------+                 +-------------------+                +-------------------+
