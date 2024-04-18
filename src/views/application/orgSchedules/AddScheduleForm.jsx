import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import { ColorPicker } from 'material-ui-color';
import { FormattedMessage } from 'react-intl';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project imports
//import ColorPalette from './ColorPalette';
import { gridSpacing } from 'store/constant';
import Loader from 'ui-component/Loader';

// ===========================|| ADD SCHEDULE FORM ||=========================== //

const getInitialValues = (event, range) => {
    const newEvent = {
        name: '',
        description: '',
        color: '#Ff0000',
        textColor: 'red',
        start: range ? new Date(range.start) : new Date(),
        end: range ? new Date(range.end) : new Date()
    };

    if (event || range) {
        return _.merge({}, newEvent, event);
    }

    return newEvent;
};

const EventSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Name is required'),
    description: Yup.string().max(1000),
    startTime: Yup.date(),
    endTime: Yup.date().when('startTime', (startTime, schema) => {
        return startTime ? schema.min(startTime, 'End time must be later than start time') : schema;
    }),
    color: Yup.string().max(255),
    textColor: Yup.string().max(255)
});

const AddScheduleForm = ({ onCancel, event, range, handleCreate, handleUpdate }) => {
    //const theme = useTheme();
    const formik = useFormik({
        initialValues: getInitialValues(event, range),
        validationSchema: EventSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const data = {
                    title: values.title,
                    description: values.description,
                    startTime: values.startTime,
                    endTime: values.endTime,
                    color: values.color
                };
                if (event) {
                    handleUpdate(event.id, data);
                } else {
                    handleCreate(data);
                }
                resetForm();
                onCancel();
                setSubmitting(false);
            } catch (error) {
                console.error(error);
            }
        }
    });

    // Check that this feature works proeprly
    if (formik.isSubmitting) {
        return <Loader />;
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormikProvider value={formik}>
                <Form autoComplete="on" noValidate onSubmit={formik.handleSubmit}>
                    <DialogTitle sx={{ pt: 2, pb: 2 }}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h4" sx={{ mb: 1 }}>
                                    {event ? (
                                        <FormattedMessage id="org-schedules-actions-add-event" />
                                    ) : (
                                        <FormattedMessage id="org-schedules-actions-edit-event" />
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Stack spacing={1}>
                            <TextField
                                fullWidth
                                label={<FormattedMessage id="org-schedules-name" />}
                                {...formik.getFieldProps('title')}
                                error={formik.touched.title && Boolean(formik.errors.name)}
                                helperText={formik.touched.title && formik.errors.name}
                            />
                            <Stack direction="row" spacing={1}>
                                <FormControl fullWidth sx={{ paddingLeft: '0px' }}>
                                    <MobileTimePicker
                                        label={<FormattedMessage id="org-schedules-startAt" />}
                                        value={formik.values.startTime}
                                        format="hh:mm a"
                                        onChange={(newValue) => {
                                            formik.setFieldValue('startTime', newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                                            />
                                        )}
                                    ></MobileTimePicker>
                                </FormControl>
                                <FormControl fullWidth>
                                    <MobileTimePicker
                                        label={<FormattedMessage id="org-schedules-endAt" />}
                                        value={formik.values.startTime}
                                        format="hh:mm a"
                                        onChange={(newValue) => {
                                            formik.setFieldValue('endTime', newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                                            />
                                        )}
                                    ></MobileTimePicker>
                                    {/* <MobileDateTimePicker
                                            label="End Date & Time"
                                            inputFormat="MM/dd/yyyy hh:mm a"
                                            value={formik.values.endTime}
                                            onChange={(newValue)
                                                => formik.setFieldValue('endTime', newValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} fullWidth error={formik.touched.endTime && Boolean(formik.errors.endTime)} />
                                            )}
                                        /> */}
                                </FormControl>
                                <Stack direction="row" spacing={gridSpacing} alignItems={'center'}>
                                    <Typography variant="h5">
                                        <FormattedMessage id="org-schedules-color" />
                                    </Typography>
                                    <FormControl fullWidth>
                                        <ColorPicker hideTextfield defaultValue={'red'} />
                                    </FormControl>
                                </Stack>
                            </Stack>
                        </Stack>
                    </DialogContent>
                    <Divider />
                    <DialogActions sx={{ pr: 2 }}>
                        <Button onClick={onCancel}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            {event ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </Form>
            </FormikProvider>
        </LocalizationProvider>
    );
};

export default AddScheduleForm;
{
    /* <MobileDateTimePicker
                                            label={<FormattedMessage id="org-schedules-startAt" />}
                                            inputFormat="MM/dd/yyyy hh:mm a"
                                            value={formik.values.startTime}
                                            onChange={(newValue) => {
                                                formik.setFieldValue('startTime', newValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                                                />
                                            )}
                                        /> */
}
