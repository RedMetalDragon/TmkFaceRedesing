import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';
// material-ui
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import Loader from 'ui-component/Loader';
import { FormattedMessage } from 'react-intl';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { Dialog } from '@mui/material';
import AddScheduleForm from './AddScheduleForm';
//import { formatTime } from 'utils/helperFunctions';
//import { ColorBox } from 'views/utilities/Color';
import { fetchOrgSchedules } from 'store/slices/orgSchedules';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';

const ColorBox = ({ bgcolor }) => (
    <Box
        sx={{
            width: 25,
            height: 25,
            maxWidth: 50, // Making the box 50x50 pixels
            maxHeight: 50,
            display: 'flex',
            margin: 'auto',
            backgroundColor: bgcolor,
            borderRadius: '5px' // Optional: Adds a little rounding to the corners
        }}
    ></Box>
);

// Company Schedules
const ListSchedules = () => {
    // use state variables
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    // use dispatch
    const dispatch = useDispatch();
    const orgSchedules = useSelector((state) => state.orgSchedules);
    const { loading, data } = orgSchedules;
    const prefixlabel = 'org-schedules-';
    const header = [
        { label: 'name', key: 1 },
        { label: 'startAt', key: 2 },
        { label: 'endAt', key: 3 },
        { label: 'color', key: 4 }
        // { label: 'day', key: 4 },
        // { label: 'hours', key: 5 }
    ];

    useEffect(() => {
        dispatch(fetchOrgSchedules());
    }, [dispatch]);

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
        setSelectedRange(null);
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    const handleEventDelete = async (id) => {
        try {
            // TODO: dispatch remove event
            // dispatch(removeEvent(id));
            handleModalClose();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateEvent = async (eventId, update) => {
        // dispatch(updateEvent({ eventId, update }));
        handleModalClose();
    };

    const handleEventCreate = async (data) => {
        dispatch(postOrgSchedule(data));
        handleModalClose();
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard
                    content={false}
                    title={<FormattedMessage id="schedules-table-title"></FormattedMessage>}
                    secondary={
                        <Stack direction="row" spacing={2} alignItems="center">
                            {/* <CSVExport data={data} filename="basic-table.csv" header={header} /> */}
                            <Button color="secondary" variant="contained" onClick={handleAddClick}>
                                <DateRangeIcon fontSize="small" sx={{ mr: 0.75 }} />
                                <FormattedMessage id="org-schedules-actions-add-event"></FormattedMessage>
                            </Button>
                        </Stack>
                    }
                >
                    {/* table */}
                    <TableContainer>
                        <Table sx={{ minWidth: 350 }} aria-label="schedules tables">
                            <TableHead>
                                <TableRow>
                                    {header.map((item) => (
                                        <TableCell key={item.key} align="center">
                                            <FormattedMessage id={`${prefixlabel}${item.label}`}>{item.label}</FormattedMessage>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, item) => (
                                    <TableRow hover key={`record-${item}`}>
                                        <TableCell align="center">{row.schedule_name}</TableCell>
                                        <TableCell align="center">{row.time_in}</TableCell>
                                        <TableCell align="center">{row.time_out}</TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                justifyItems: 'center',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                alignContent: 'center'
                                            }}
                                        >
                                            <ColorBox bgcolor="red" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Dialog maxWidth="sm" fullWidth onClose={handleModalClose} open={isModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
                        {isModalOpen && (
                            <AddScheduleForm
                                event={selectedEvent}
                                range={selectedRange}
                                onCancel={handleModalClose}
                                handleDelete={handleEventDelete}
                                handleCreate={handleEventCreate}
                                handleUpdate={handleUpdateEvent}
                            />
                        )}
                    </Dialog>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default ListSchedules;
