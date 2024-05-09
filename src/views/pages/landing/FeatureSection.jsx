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

const OfferCard = ({ title, caption, image }) => {
    const theme = useTheme();
    const AvaterSx = { background: 'transparent', color: theme.palette.secondary.main, width: 56, height: 56 };
    return (
        <FadeInWhenVisible>
            <SubCard
                sx={{
                    bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.100',
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
                        <Typography variant="h3" sx={{ fontWeight: 500 }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '1rem' }}>
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
    image: PropTypes.string
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
                            title="Beautiful User Interface"
                            caption="Timekeeper can improve the productivity and save time by providing a clear and intuitive layout, and consistent look and feel."
                            image={Offer1}
                        />
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title="Time and Cost Savings"
                            caption="Timekeeper can save employees time and effort by providing a responsive user interface, allowing them to focus on the job solely."
                            image={Offer2}
                        />
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title="Reduce Complexity"
                            caption="Timekeeper simplifies HR department work with easy and flexibles options."
                            image={Offer3}
                        />
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title="Improved Scalability"
                            caption="Timkeeeper uses scalable technologies and resources to ensure that your HR department get what they needs at a click of distance as the bussiness needs evolve."
                            image={Offer4}
                        />
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title=" Well-Documented and Supported"
                            caption="With a range of resources including user guides, tutorials, and FAQs to help users understand and effectively use Timekeeper."
                            image={Offer5}
                        />
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <OfferCard
                            title="Performance Centric"
                            caption="Timekeeper is a performance-centric web application designed to deliver optimal performance for all your employees."
                            image={Offer6}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Container>
);

export default FeatureSection;
