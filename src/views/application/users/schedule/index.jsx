// material-ui
import { Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import Loader from 'ui-component/Loader';
import { FormattedMessage } from 'react-intl';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { fetchUserScheduleTable } from 'store/slices/schedule';
import { useEffect } from 'react';
import { formatTime } from 'utils/helperFunctions';

const UserScheduleTable = () => {
    const dispatch = useDispatch();
    const scheduleState = useSelector((state) => state.schedule);
    const { loading, data } = scheduleState;
    const prefixLabel = 'schedule-data-';
    const prefixDayOfWeek = 'day-of-week-';
    // Headers table
    const header = [
        { label: 'date', key: 1 },
        { label: 'in', key: 2 },
        { label: 'out', key: 3 },
        { label: 'day', key: 4 },
        { label: 'hours', key: 5 }
    ];
    useEffect(() => {
        dispatch(fetchUserScheduleTable());
    }, [dispatch]);

    if (loading) return <Loader />;

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard
                    content={false}
                    title="Attendance Table"
                    secondary={
                        <Stack direction="row" spacing={2} alignItems="center">
                            {/* <CSVExport data={data} filename="basic-table.csv" header={header} /> */}
                            <SecondaryAction link="https://next.material-ui.com/components/tables/" />
                        </Stack>
                    }
                >
                    {/* table */}
                    <TableContainer>
                        <Table sx={{ minWidth: 350 }} aria-label="schedule table">
                            <TableHead>
                                <TableRow>
                                    {header.map((item) => (
                                        <TableCell key={item.key} align="center">
                                            <FormattedMessage id={`${prefixLabel}${item.label}`}>{item.label}</FormattedMessage>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, item) => (
                                    <TableRow hover key={`record-${item}`}>
                                        <TableCell align="center">{row.date}</TableCell>
                                        <TableCell align="center">{formatTime(row.in)}</TableCell>
                                        <TableCell align="center">{formatTime(row.out)}</TableCell>
                                        <TableCell align="center">
                                            <FormattedMessage id={`${prefixDayOfWeek}${row.day.toLowerCase()}`}>{row.day}</FormattedMessage>
                                        </TableCell>
                                        <TableCell align="center">{row.hours}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default UserScheduleTable;
