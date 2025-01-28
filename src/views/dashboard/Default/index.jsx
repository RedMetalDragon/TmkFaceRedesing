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
import PunchInOutDialog from 'ui-component/dialogs/PunchInOutDialog';
import { useDispatch } from 'store';
import { setInitialAction } from 'store/slices/punchInOut';
import { performPunchIn, performPunchOut } from 'store/slices/punchInOut';
import { PUNCH_IN } from 'store/actions';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);
    const [openPunchInOutDialog, setOpenPunchInOutDialog] = useState(false);
    const action = useSelector((state) => state.punchInOut.punchActionToPerform);

    const handleClosePunchInOutDialog = () => {
        setOpenPunchInOutDialog(false);
    };

    const performAction = () => {
        console.log('performing action');
        if (action === PUNCH_IN) {
            dispatch(performPunchIn());
        } else {
            dispatch(performPunchOut());
        }
    };

    useEffect(() => {
        dispatch(setInitialAction());
        setLoading(false);
    }, [dispatch]);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item sm={12} xs={12} md={12} lg={12}>
                <GreetingCard setModalOpen={setOpenPunchInOutDialog} />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <CarouselCard isLoading={isLoading}></CarouselCard>
                {/* <EarningCard isLoading={isLoading} /> */}
            </Grid>
            {openPunchInOutDialog && (
                <PunchInOutDialog
                    open={openPunchInOutDialog}
                    handleClose={handleClosePunchInOutDialog}
                    action={action}
                    handleOK={performAction} // eslint-disable-line no-empty-function
                />
            )}
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
