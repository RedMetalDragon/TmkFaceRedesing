import PropTypes from 'prop-types';
import { Button, Grid, Stack, Typography, Divider } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useFormik } from 'formik';
import { useTheme } from '@mui/material/styles';
import * as yup from 'yup';
import CompanyAddress from './CompanyAddress';

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

const CompanyAddressForm = ({ companyInfo, setCompanyInfo, handleNext, setErrorIndex, industries }) => {
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
        onSubmit: (values) => {
            setCompanyInfo(values);
            handleNext();
        }
    });

    // Add industries to formik object so it's accessible in child components
    formik.industries = industries;

    return (
        <Grid container spacing={3} sx={{ padding: theme.spacing(2) }}>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2, textAlign: 'center' }}>
                    Company Information
                </Typography>
                <Grid item xs={12}>
                    <Divider sx={{ mb: 2 }} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={formik.handleSubmit} id="company-address-form">
                    <Grid container spacing={3}>
                        <CompanyAddress formik={formik} />
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
            </Grid>
        </Grid>
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
