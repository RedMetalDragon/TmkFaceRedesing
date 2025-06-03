import PropTypes from 'prop-types';
import { Button, Grid, Stack, Typography, TextField, FormControlLabel, Checkbox, MenuItem } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    workingHours: yup.string().required('Working hours are required'),
    probationPeriod: yup.string().required('Probation period is required'),
    ptoPolicy: yup.string().required('PTO Policy is required'),
    allowWorkFromHome: yup.boolean()
});

const HRPoliciesForm = ({ policy, setPolicy, handleNext, setErrorIndex, workingHoursOptions, probationOptions, ptoOptions }) => {
    const formik = useFormik({
        initialValues: {
            workingHours: policy.workingHours || '',
            probationPeriod: policy.probationPeriod || '',
            ptoPolicy: policy.ptoPolicy || '',
            allowWorkFromHome: policy.allowWorkFromHome || false
        },
        validationSchema,
        onSubmit: (values) => {
            setPolicy(values);
            handleNext();
        }
    });

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                HR Policies
            </Typography>
            <form onSubmit={formik.handleSubmit} id="hr-policies-form">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="workingHours"
                            name="workingHours"
                            label="Working Hours *"
                            select
                            value={formik.values.workingHours}
                            onChange={formik.handleChange}
                            error={formik.touched.workingHours && Boolean(formik.errors.workingHours)}
                            helperText={formik.touched.workingHours && formik.errors.workingHours}
                            fullWidth
                        >
                            <MenuItem value="">Select Working Hours</MenuItem>
                            {workingHoursOptions && workingHoursOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="probationPeriod"
                            name="probationPeriod"
                            label="Probation Period *"
                            select
                            value={formik.values.probationPeriod}
                            onChange={formik.handleChange}
                            error={formik.touched.probationPeriod && Boolean(formik.errors.probationPeriod)}
                            helperText={formik.touched.probationPeriod && formik.errors.probationPeriod}
                            fullWidth
                        >
                            <MenuItem value="">Select Probation Period</MenuItem>
                            {probationOptions && probationOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="ptoPolicy"
                            name="ptoPolicy"
                            label="PTO Policy *"
                            select
                            value={formik.values.ptoPolicy}
                            onChange={formik.handleChange}
                            error={formik.touched.ptoPolicy && Boolean(formik.errors.ptoPolicy)}
                            helperText={formik.touched.ptoPolicy && formik.errors.ptoPolicy}
                            fullWidth
                        >
                            <MenuItem value="">Select PTO Policy</MenuItem>
                            {ptoOptions && ptoOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="allowWorkFromHome"
                                    name="allowWorkFromHome"
                                    color="primary"
                                    checked={formik.values.allowWorkFromHome}
                                    onChange={formik.handleChange}
                                />
                            }
                            label="Allow Work From Home"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit" onClick={() => setErrorIndex(0)}>
                                    Next
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

HRPoliciesForm.propTypes = {
    policy: PropTypes.object,
    setPolicy: PropTypes.func,
    handleNext: PropTypes.func,
    setErrorIndex: PropTypes.func,
    workingHoursOptions: PropTypes.array, // [{ value: '', label: '' }]
    probationOptions: PropTypes.array, // [{ value: '', label: '' }]
    ptoOptions: PropTypes.array // [{ value: '', label: '' }]
};

export default HRPoliciesForm;

// Example usage:
// import { useDispatch, useSelector } from 'react-redux';
// import { setPolicy } from 'store/slices/onBoardCompanyRegistration';
//
// const dispatch = useDispatch();
// const policy = useSelector((state) => state.onBoardCompanyRegistration.policy);
//
// const workingHoursOptions = [
//   { value: '9-5', label: '9am - 5pm' },
//   { value: 'flex', label: 'Flexible' },
//   ...
// ];
// const probationOptions = [
//   { value: '3m', label: '3 Months' },
//   { value: '6m', label: '6 Months' },
//   ...
// ];
// const ptoOptions = [
//   { value: 'standard', label: 'Standard PTO' },
//   { value: 'unlimited', label: 'Unlimited PTO' },
//   ...
// ];
//
// <HRPoliciesForm
//   policy={policy}
//   setPolicy={(info) => dispatch(setPolicy(info))}
//   handleNext={...}
//   setErrorIndex={...}
//   workingHoursOptions={workingHoursOptions}
//   probationOptions={probationOptions}
//   ptoOptions={ptoOptions}
// />
