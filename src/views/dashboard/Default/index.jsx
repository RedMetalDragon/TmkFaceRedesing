import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
// import EarningCard from './EarningCard';
//eslint-disable-next-line
import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
//eslint-disable-next-line
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import CarouselCard from './CarouselCard';
import GreetingCard from './GreetingCard';
import { useSelector } from 'store';
import AttendanceCard from './AttendanceCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const user = useSelector((state) => state.user);
    useEffect(() => {
        console.log(user);
        setLoading(false);
    }, [user]);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item sm={12} xs={12} md={12} lg={12}>
                <GreetingCard userName={user.userFirstName} />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <CarouselCard isLoading={isLoading}></CarouselCard>
                {/* <EarningCard isLoading={isLoading} /> */}
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <AttendanceCard isLoading={isLoading} />
                    </Grid>
                    {/*<Grid item xs={12} md={4}>*/}
                    {/*    <PopularCard isLoading={isLoading} />*/}
                    {/*</Grid>*/}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
