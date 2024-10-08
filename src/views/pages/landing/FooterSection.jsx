// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Container, Grid, IconButton, Link, Stack, Typography } from '@mui/material'; // Divider

// project import
import Chip from 'ui-component/extended/Chip';
import { frameworks } from './FrameworkSection';

// assets
// import Dribble from 'assets/images/landing/footer-dribble.png';
// import Freepik from 'assets/images/landing/footer-freepik.png';
// import Awards from 'assets/images/landing/footer-awards.png';

import PublicIcon from '@mui/icons-material/Public';
import TwitterIcon from '@mui/icons-material/Twitter';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

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
                    {/* <Grid item xs={12}>
                        <Stack spacing={4.25}>
                           
                            <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={{ xs: 1.5, sm: 6, md: 10, lg: 12 }}
                                sx={{ overflow: 'hidden' }}
                            >
                                <img src={Dribble} alt="dribble" />
                                <img src={Freepik} alt="freepik" />
                                <img src={Awards} alt="awards" />
                            </Stack>
                            <Divider sx={dividerSX} />
                        </Stack>
                    </Grid> */}
                    <Grid item xs={12}>
                        <Grid container spacing={8}>
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
                                                <FooterLink href="#" target="_blank" underline="none">
                                                    About us
                                                </FooterLink>
                                                <FooterLink href="https://codedthemes.gitbook.io/berry/" target="_blank" underline="none">
                                                    Contact us
                                                </FooterLink>
                                                <FooterLink
                                                    href="https://codedthemes.gitbook.io/berry/changelog"
                                                    target="_blank"
                                                    underline="none"
                                                >
                                                    Blog
                                                </FooterLink>
                                                {/* <FooterLink href="https://codedthemes.support-hub.io/" target="_blank" underline="none">
                                                    Support
                                                </FooterLink> */}
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
                                    {/* <Grid item xs={6} sm={3}>
                                        <Stack spacing={{ xs: 3, md: 5 }}>
                                            <Typography variant="h4" color={textColor} sx={{ fontWeight: 500 }}>
                                                Free Versions
                                            </Typography>
                                            <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                                                <FooterLink href="https://links.codedthemes.com/Yfkxg" target="_blank" underline="none">
                                                    Free React MUI
                                                </FooterLink>
                                                <FooterLink href="https://links.codedthemes.com/epTmN" target="_blank" underline="none">
                                                    Free Bootstrap 5
                                                </FooterLink>
                                                <FooterLink href="https://links.codedthemes.com/seQKN" target="_blank" underline="none">
                                                    Free Angular
                                                </FooterLink>
                                                <FooterLink href="https://links.codedthemes.com/Wfbiy" target="_blank" underline="none">
                                                    Free Django
                                                </FooterLink>
                                            </Stack>
                                        </Stack>
                                    </Grid> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default FooterSection;
