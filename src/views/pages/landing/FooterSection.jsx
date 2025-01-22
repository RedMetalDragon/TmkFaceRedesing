// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Container, Grid, Link, Stack, Typography } from '@mui/material'; // Divider
import { Instagram, Facebook, Twitter, LinkedIn } from '@mui/icons-material';
import { red } from '@mui/material/colors';

// project import

// assets
// import Dribble from 'assets/images/landing/footer-dribble.png';
// import Freepik from 'assets/images/landing/footer-freepik.png';
// import Awards from 'assets/images/landing/footer-awards.png';

// Link - custom style
const FooterLink = styled(Link)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.text.hint,
    '&:hover': {
        color: theme.palette.primary.main
    },
    '&:active': {
        color: theme.palette.primary.main
    }
}));

// =============================|| LANDING - FOOTER SECTION ||============================= //

const FooterSection = () => {
    // eslint-disable-next-line no-unused-vars
    const theme = useTheme();
    const textColor = 'white';

    // const dividerSX = {
    //     borderImageSlice: 1,
    //     borderImageSource: `linear-gradient(90deg, rgba(255, 255, 255, 0) -0.01%, rgba(255, 255, 255, 0.56) 51.97%, rgba(255, 255, 255, 0.03) 99.99%)`,
    //     opacity: 0.5
    // };

    return (
        <>
            <Container>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Grid
                            container
                            spacing={4}
                            sx={{ borderBottom: '1px solid white', borderTop: '1px solid white', paddingBottom: 2, paddingTop: 1 }}
                        >
                            <Grid item xs={12} md={4}>
                                <Stack spacing={{ xs: 2, md: 5 }}>
                                    <Typography variant="h4" color={textColor} sx={{ fontWeight: 500 }}>
                                        About us
                                    </Typography>
                                    <Typography variant="body2" color={textColor}>
                                        TimeKeeper streamlines workforce management with tools for scheduling, PTO tracking, AI-driven
                                        recruitment, and seamless payroll integration, all in one platform.
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Grid container spacing={{ xs: 5, md: 2 }}>
                                    <Grid item xs={6} sm={3}>
                                        <Stack spacing={{ xs: 3, md: 5 }}>
                                            <Typography variant="h4" color={textColor} sx={{ fontWeight: 500 }}>
                                                Explore us
                                            </Typography>
                                            <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                                                <FooterLink href="about-us" target="_blank" underline="none">
                                                    About us
                                                </FooterLink>
                                                <FooterLink href="/contact-us" target="_blank" underline="none">
                                                    Contact us
                                                </FooterLink>
                                                <FooterLink href="/blog" target="_blank" underline="none">
                                                    Blog
                                                </FooterLink>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Stack spacing={{ xs: 3, md: 5 }}>
                                            <Typography variant="h4" color={textColor} sx={{ fontWeight: 500 }}>
                                                Help
                                            </Typography>
                                            <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                                                <FooterLink href="#" target="_blank" underline="none">
                                                    Documentation
                                                </FooterLink>
                                                <FooterLink href="#" target="_blank" underline="none">
                                                    Support
                                                </FooterLink>
                                                <FooterLink href="#" target="_blank" underline="none">
                                                    Submit a Request
                                                </FooterLink>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Stack spacing={{ xs: 3, md: 5 }}>
                                            <Typography variant="h4" color={textColor} sx={{ fontWeight: 500 }}>
                                                Features
                                            </Typography>
                                            <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                                                <FooterLink href="#" target="_blank" underline="none">
                                                    AI
                                                </FooterLink>
                                                <FooterLink href="#" target="_blank" underline="none">
                                                    Reports
                                                </FooterLink>
                                                <FooterLink href="#" target="_blank" underline="none">
                                                    Document Mgmt
                                                </FooterLink>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                                <Stack
                                    direction={{ xs: 'column', sm: 'column' }} // Changed to column for stacking
                                    alignItems="center"
                                    justifyContent="center"
                                    spacing={{ xs: 1.5, sm: 1, md: 3 }}
                                >
                                    <Typography color="white" align="center" sx={{ paddingTop: 2 }}>
                                        All Rights Reserved ©timekeeper.com
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={{ xs: 3, sm: 1.5, md: 2 }}>
                                        <Instagram sx={{ color: 'white', '&:hover': { color: 'white' } }} />
                                        <Facebook sx={{ color: 'white', '&:hover': { color: 'white' } }} />
                                        <Twitter sx={{ color: 'white', '&:hover': { color: 'white' } }} />
                                        <LinkedIn sx={{ color: 'white', '&:hover': { color: 'white' } }} />
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default FooterSection;
