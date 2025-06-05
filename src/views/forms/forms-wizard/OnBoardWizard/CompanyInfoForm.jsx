import PropTypes from 'prop-types';
import { Button, Grid, Stack, Typography, TextField } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useFormik } from 'formik';
import { useTheme } from '@mui/material/styles';
import * as yup from 'yup';
import CompanyAddress from './CompanyAddress'; // your address‐fields component
import Autocomplete from '@mui/material/Autocomplete';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const validationSchema = yup.object({
    name: yup.string().required('Company Name is required'),
    industry: yup.string().required('Industry is required'),
    address1: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State/Province is required'),
    zipCode: yup.string().required('ZIP/Postal Code is required'),
    country: yup.string().required('Country is required'),
    phone: yup
        .string()
        .required('Phone number is required')
        .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{4,6}$/, 'Please enter a valid phone number')
});

const CompanyInfoForm = ({ companyInfo, setCompanyInfo, handleNext, industries }) => {
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {
            name: companyInfo.name || '',
            industry: companyInfo.industry || '',
            address1: companyInfo.address1 || '',
            address2: companyInfo.address2 || '',
            city: companyInfo.city || '',
            state: companyInfo.state || '',
            zipCode: companyInfo.zipCode || '',
            country: companyInfo.country || '',
            phone: companyInfo.phone || ''
        },
        validationSchema,
        validateOnMount: true,
        onSubmit: (values) => {
            setCompanyInfo(values);
            handleNext();
        }
    });

    // Make sure CompanyAddress can see the same industries array if needed
    formik.industries = industries;

    return (
        <form onSubmit={formik.handleSubmit} id="company-info-form">
            <br />
            <Grid container spacing={2} sx={{ borderTop: `2px solid ${theme.palette.divider}` }}>
                {/* ─── Left panel: Company Details ─── */}
                <Grid item xs={6}>
                    <Grid item>
                        <Typography
                            variant="h4"
                            align="center"
                            textAlign={'center'}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            <AddBusinessIcon
                                sx={{
                                    fontSize: '1.5rem',
                                    color: theme.palette.primary.main
                                }}
                            />
                            Company Details
                        </Typography>
                    </Grid>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <TextField
                                id="name"
                                name="name"
                                label="Company Name *"
                                fullWidth
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Grid>

                        <Grid item xs={10}>
                            <Autocomplete
                                id="industry"
                                options={industries}
                                getOptionLabel={(opt) => opt.label}
                                value={industries.find((opt) => opt.value === formik.values.industry) || null}
                                onChange={(event, newOption) => {
                                    formik.setFieldValue('industry', newOption ? newOption.value : '', true);
                                    formik.setFieldTouched('industry', true, false);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        name="industry"
                                        label="Industry *"
                                        fullWidth
                                        error={formik.touched.industry && Boolean(formik.errors.industry)}
                                        helperText={formik.touched.industry && formik.errors.industry}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={10} justifyContent={'left'} alignContent={'left'} justifyItems={'left'} alignItems={'left'}>
                            <TextField
                                id="phone"
                                name="phone"
                                label="Phone Number *"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                                fullWidth
                                placeholder="+1 (555) 123-4567"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                {/* ─── Right panel: Company Address ─── */}
                <Grid item xs={6}>
                    <Grid item>
                        <Typography
                            variant="h4"
                            align="center"
                            textAlign={'center'}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            <LocationOnIcon sx={{ fontSize: 20, color: theme.palette.primary.main, mr: 2 }} />
                            Company Address
                        </Typography>
                    </Grid>
                    <br />
                    <CompanyAddress formik={formik} />
                </Grid>
                {/* ─── Bottom: Continue Button (full width) ─── */}
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="flex-end">
                        <AnimateButton>
                            <Button variant="contained" type="submit" disabled={!formik.isValid || formik.isSubmitting} sx={{ mt: 3 }}>
                                Continue
                            </Button>
                        </AnimateButton>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    );
};

CompanyInfoForm.propTypes = {
    companyInfo: PropTypes.object.isRequired,
    setCompanyInfo: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    industries: PropTypes.array.isRequired // e.g. [{ value: 'tech', label: 'Technology' }, …]
};

export default CompanyInfoForm;
