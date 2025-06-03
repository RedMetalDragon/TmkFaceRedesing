import PropTypes from 'prop-types';
import { Button, Grid, Stack, Typography, TextField } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup.string().required('Company Name is required'),
    industry: yup.string().required('Industry is required'),
    address: yup.string().required('Company Address is required'),
});

const CompanyAddressForm = ({ companyInfo, setCompanyInfo, handleNext, setErrorIndex, industries }) => {
    const formik = useFormik({
        initialValues: {
            name: companyInfo.name || '',
            industry: companyInfo.industry || '',
            address: companyInfo.address || ''
        },
        validationSchema,
        onSubmit: (values) => {
            setCompanyInfo(values);
            handleNext();
        }
    });

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Company Information
            </Typography>
            <form onSubmit={formik.handleSubmit} id="company-address-form">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            id="name"
                            name="name"
                            label="Company Name *"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="industry"
                            name="industry"
                            label="Industry *"
                            select
                            SelectProps={{ native: true }}
                            value={formik.values.industry}
                            onChange={formik.handleChange}
                            error={formik.touched.industry && Boolean(formik.errors.industry)}
                            helperText={formik.touched.industry && formik.errors.industry}
                            fullWidth
                        >
                            <option value="">Select Industry</option>
                            {industries && industries.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="address"
                            name="address"
                            label="Company Address *"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                            fullWidth
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

CompanyAddressForm.propTypes = {
    companyInfo: PropTypes.object,
    setCompanyInfo: PropTypes.func,
    handleNext: PropTypes.func,
    setErrorIndex: PropTypes.func,
    industries: PropTypes.array // [{ value: '', label: '' }]
};

export default CompanyAddressForm;

// Example usage:
// import { useDispatch, useSelector } from 'react-redux';
// import { setCompanyInfo } from 'store/slices/onBoardCompanyRegistration';
//
// const industries = [
//   { value: 'tech', label: 'Technology' },
//   { value: 'finance', label: 'Finance' },
//   ...
// ];
//
// const dispatch = useDispatch();
// const companyInfo = useSelector((state) => state.onBoardCompanyRegistration.companyInfo);
//
// <CompanyAddressForm
//   companyInfo={companyInfo}
//   setCompanyInfo={(info) => dispatch(setCompanyInfo(info))}
//   handleNext={...}
//   setErrorIndex={...}
//   industries={industries}
// />
