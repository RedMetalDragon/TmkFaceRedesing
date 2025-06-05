import PropTypes from 'prop-types';
import { Grid, TextField, Typography, Divider, Autocomplete, Box } from '@mui/material';
import { countryToFlag } from 'utils/helperFunctions';

// filtered country list containing only USA and Brazil
const countries = [
    { code: 'US', label: 'United States', phone: '1' },
    { code: 'BR', label: 'Brazil', phone: '55' }
];

const CompanyAddress = ({ formik }) => {
    return (
        <>
            <Grid item xs={12}>
                <TextField
                    id="address1"
                    name="address1"
                    label="Address Line 1 *"
                    value={formik.values.address1}
                    onChange={formik.handleChange}
                    error={formik.touched.address1 && Boolean(formik.errors.address1)}
                    helperText={formik.touched.address1 && formik.errors.address1}
                    fullWidth
                    placeholder="Street address, P.O. box, company name"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="address2"
                    name="address2"
                    label="Address Line 2"
                    value={formik.values.address2}
                    onChange={formik.handleChange}
                    error={formik.touched.address2 && Boolean(formik.errors.address2)}
                    helperText={formik.touched.address2 && formik.errors.address2}
                    fullWidth
                    placeholder="Apartment, suite, unit, building, floor, etc."
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="city"
                    name="city"
                    label="City *"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="state"
                    name="state"
                    label="State/Province *"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="zipCode"
                    name="zipCode"
                    label="ZIP/Postal Code *"
                    value={formik.values.zipCode}
                    onChange={formik.handleChange}
                    error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                    helperText={formik.touched.zipCode && formik.errors.zipCode}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Autocomplete
                    id="country"
                    name="country"
                    options={countries}
                    autoHighlight
                    value={countries.find((option) => option.label === formik.values.country) || null}
                    onChange={(event, newValue) => {
                        formik.setFieldValue('country', newValue ? newValue.label : '');
                    }}
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > span': { mr: 2 } }} {...props}>
                            <span>{countryToFlag(option.code)}</span>
                            {option.label}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Country *"
                            error={formik.touched.country && Boolean(formik.errors.country)}
                            helperText={formik.touched.country && formik.errors.country}
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password' // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="phone"
                    name="phone"
                    label="Phone Number *"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    fullWidth
                    placeholder="+1 (555) 123-4567"
                />
            </Grid>
        </>
    );
};

CompanyAddress.propTypes = {
    formik: PropTypes.object.isRequired
};

export default CompanyAddress;
