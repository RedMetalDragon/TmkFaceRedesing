import PropTypes from 'prop-types';
import { Button, Grid, Stack, Typography, TextField } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    jobTitle: yup.string().required('Job Title is required'),
    phone: yup.string().required('Phone number is required')
});

const PrimaryAdminForm = ({ primaryAdmin, setPrimaryAdmin, handleNext, handleBack, setErrorIndex }) => {
    const formik = useFormik({
        initialValues: {
            firstName: primaryAdmin.firstName || '',
            lastName: primaryAdmin.lastName || '',
            email: primaryAdmin.email || '',
            jobTitle: primaryAdmin.jobTitle || '',
            phone: primaryAdmin.phone || ''
        },
        validationSchema,
        onSubmit: (values) => {
            setPrimaryAdmin(values);
            handleNext();
        }
    });

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Primary Administrator Information
            </Typography>
            <form onSubmit={formik.handleSubmit} id="primary-admin-form">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="firstName"
                            name="firstName"
                            label="First Name *"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="lastName"
                            name="lastName"
                            label="Last Name *"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="email"
                            name="email"
                            label="Email *"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="jobTitle"
                            name="jobTitle"
                            label="Job Title *"
                            value={formik.values.jobTitle}
                            onChange={formik.handleChange}
                            error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
                            helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="phone"
                            name="phone"
                            label="Phone Number *"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-between" spacing={2}>
                            <AnimateButton>
                                <Button variant="outlined" onClick={handleBack} sx={{ my: 3 }}>
                                    Back
                                </Button>
                            </AnimateButton>
                            <AnimateButton>
                                <Button variant="contained" sx={{ my: 3 }} type="submit" onClick={() => setErrorIndex(0)}>
                                    Continue
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

PrimaryAdminForm.propTypes = {
    primaryAdmin: PropTypes.object,
    setPrimaryAdmin: PropTypes.func,
    handleNext: PropTypes.func,
    handleBack: PropTypes.func,
    setErrorIndex: PropTypes.func
};

export default PrimaryAdminForm;

// Example usage:
// import { useDispatch, useSelector } from 'react-redux';
// import { setPrimaryAdmin } from 'store/slices/onBoardCompanyRegistration';
//
// const dispatch = useDispatch();
// const primaryAdmin = useSelector((state) => state.onBoardCompanyRegistration.primaryAdmin);
//
// <PrimaryAdminForm
//   primaryAdmin={primaryAdmin}
//   setPrimaryAdmin={(info) => dispatch(setPrimaryAdmin(info))}
//   handleNext={...}
//   handleBack={...}
//   setErrorIndex={...}
// />
