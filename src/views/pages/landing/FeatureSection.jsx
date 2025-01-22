import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Typography, Stack, CardMedia } from '@mui/material';

// project imports
import FadeInWhenVisible from './Animation';
import SubCard from 'ui-component/cards/SubCard';
import Avatar from 'ui-component/extended/Avatar';

// assets
import Offer1 from 'assets/images/landing/offer/offer-1.png';
import Offer2 from 'assets/images/landing/offer/offer-2.png';
import Offer3 from 'assets/images/landing/offer/offer-3.png';
import Offer4 from 'assets/images/landing/offer/offer-4.png';
import Offer5 from 'assets/images/landing/offer/offer-5.png';
import Offer6 from 'assets/images/landing/offer/offer-6.png';

const OfferCard = ({ title, caption, image, bgcolor = 'tmkPurple' }) => {
    const theme = useTheme();
    const AvaterSx = { background: 'transparent', color: theme.palette.secondary.main, width: 56, height: 56 };
    return (
        <FadeInWhenVisible>
            <SubCard
                sx={{
                    background: theme.palette.customBackground[bgcolor],
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.divider,
                    '&:hover': { boxShadow: 'none' },
                    height: '100%'
                }}
            >
                <Stack spacing={4}>
                    <Avatar variant="rounded" sx={AvaterSx}>
                        <CardMedia component="img" src={image} alt="Beautiful User Interface" />
                    </Avatar>
                    <Stack spacing={2}>
                        <Typography variant="h3" sx={{ fontWeight: 500 }} color="white">
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '1rem' }} color="white">
                            {caption}
                        </Typography>
                    </Stack>
                </Stack>
            </SubCard>
        </FadeInWhenVisible>
    );
};

OfferCard.propTypes = {
    title: PropTypes.string,
    caption: PropTypes.string,
    image: PropTypes.string,
    bgcolor: PropTypes.string
};
// =============================|| LANDING - FEATURE PAGE ||============================= //

const FeatureSection = () => (
    <Container>
        <Grid container spacing={7.5} justifyContent="center">
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                        <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                            What does Timekeeper offer?
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                            Timekeeper is a reliable choice for your HR deparment needs, offering a wide range of features to easily manage
                            employee time, attendance, etc.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={5} sx={{ '&> .MuiGrid-root > div': { height: '100%' } }}>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title="AI Driven Employee Recruitment"
                            caption="Streamline recruitment with AI tools that help identify and attract top talent."
                            image={Offer1}
                            bgcolor="tmkGreen"
                        />
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title="AI Powered Job Posting Creation"
                            caption="Generate compelling and accurate job descriptions tailored to your needs."
                            image={Offer2}
                            bgcolor="tmkPink"
                        />
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title="Document Mgmt & E-Signatures"
                            caption="Securely store and manage documents, and simplify workflows with e-signatures capabilities."
                            image={Offer3}
                            bgcolor="tmkYellow"
                        />
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title="Effortless Attendance Tracking"
                            caption="Simplify clocks-ins, clock-outs, and monitor employee hours with precision."
                            image={Offer4}
                            bgcolor="tmkOrange"
                        />
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title="Comprehensive PTO Mgmt."
                            caption="Easily manage paid time off request, approvals, and balances."
                            image={Offer5}
                            bgcolor="tmkBlue"
                        />
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title="Flexible Payroll Integrations"
                            caption="Integrate seamlessly with your existing payroll systems."
                            image={Offer6}
                            bgcolor="tmkPurple"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Container>
);

export default FeatureSection;
