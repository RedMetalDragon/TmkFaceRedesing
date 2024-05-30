// material-ui
import { useTheme, styled } from '@mui/material/styles';

// project imports
import Customization from 'layout/Customization';
//import RtlInfoSection from 'ui-component/extended/RtlInfoSection';
import AppBar from 'ui-component/extended/AppBar';
import HeaderSection from './HeaderSection';
import CardSection from './CardSection';
import FeatureSection from './FeatureSection';
//import IncludeSection from './IncludeSection';
import { Typography } from '@mui/material';
//eslint-disable-next-line
import PeopleSection from './PeopleSection';
//eslint-disable-next-line
import FooterSection from './FooterSection';
//eslint-disable-next-line
import CustomizeSection from './CustomizeSection';
//eslint-disable-next-line
import PreBuildDashBoard from './PreBuildDashBoard';
//eslint-disable-next-line
import StartupProjectSection from './StartupProjectSection';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';
// import IncludeSection from './IncludeSection';
// import RtlInfoSection from './RtlInfoSection';

// custom stlye
const HeaderWrapper = styled('div')(({ theme }) => ({
    overflowX: 'hidden',
    overflowY: 'clip',
    background:
        theme.palette.mode === 'dark'
            ? theme.palette.background.default
            : `linear-gradient(360deg, ${theme.palette.grey[100]} 1.09%, ${theme.palette.background.paper} 100%)`,
    [theme.breakpoints.down('md')]: {}
}));

const SectionWrapper = styled('div')({
    paddingTop: 100,
    paddingBottom: 100
});

// =============================|| LANDING MAIN ||============================= //

const Landing = () => {
    const theme = useTheme();

    return (
        <>
            {/* 1. header and hero section */}
            <HeaderWrapper id="home">
                <AppBar />
                <HeaderSection />
            </HeaderWrapper>
            {/* 2. card section 
            <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'grey.100' }}>
                <CardSection />
            </SectionWrapper>
            */}

            {/* 3. about section */}
            <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'grey.100' }}>
                <FeatureSection />
            </SectionWrapper>

            {/* 4. Apps */}
            {/*
            <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.50' }}>
                
                 <Container>
                    <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                        <Grid container spacing={2.5}>
                            <Grid item xs={12} sx={{ mb: '1.25rem' }}>
                                <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                                    Plans & Pricing
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container> 
            </SectionWrapper>
            */}
            {/* 4. developer experience section */}
            {/* <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.100' }}>
                <CustomizeSection />
            </SectionWrapper> */}

            {/* 6. startup section */}
            <SectionWrapper sx={{ py: 0 }}>
                <StartupProjectSection />
            </SectionWrapper>

            {/* 5. people section */}
            {/* <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'background.default' }}>
                <PeopleSection />
            </SectionWrapper> */}

            {/* 7. inculde section */}
            {/* <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'background.default' }}>
                <IncludeSection />
            </SectionWrapper> */}

            {/* 8. multi-language section */}
            {/* <SectionWrapper sx={{ py: 0 }}>
                <RtlInfoSection />
            </SectionWrapper> */}

            {/* 9. framework section */}
            {/* <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'background.default' }}>
                <FrameworkSection />
            </SectionWrapper> */}

            {/* 10. footer section */}
            <SectionWrapper sx={{ bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'dark.900', pb: 0 }}>
                <FooterSection />
            </SectionWrapper>
            <Customization />
        </>
    );
};

export default Landing;
