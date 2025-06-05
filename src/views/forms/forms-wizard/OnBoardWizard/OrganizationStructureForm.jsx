import PropTypes from 'prop-types';
import { Button, Grid, Stack, Typography, TextField, IconButton, List, ListItem, ListItemText } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const validationSchema = yup.object({
    department: yup.string().required('Department name is required')
});

const OrganizationStructureForm = ({ departments, setDepartments, handleNext, setErrorIndex }) => {
    const [localDepartments, setLocalDepartments] = useState(departments || []);
    const formik = useFormik({
        initialValues: {
            department: ''
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            if (!localDepartments.includes(values.department)) {
                const updated = [...localDepartments, values.department];
                setLocalDepartments(updated);
                setDepartments(updated);
            }
            resetForm();
        }
    });

    const handleRemove = (dept) => {
        const updated = localDepartments.filter((d) => d !== dept);
        setLocalDepartments(updated);
        setDepartments(updated);
    };

    const handleNextStep = () => {
        setDepartments(localDepartments);
        handleNext();
    };

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Organization Structure
            </Typography>
            <form onSubmit={formik.handleSubmit} id="organization-structure-form">
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={10}>
                        <TextField
                            id="department"
                            name="department"
                            label="Add Department *"
                            value={formik.values.department}
                            onChange={formik.handleChange}
                            error={formik.touched.department && Boolean(formik.errors.department)}
                            helperText={formik.touched.department && formik.errors.department}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <AnimateButton>
                            <Button variant="contained" color="primary" type="submit" sx={{ height: '100%' }}>
                                Add
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </form>
            <List>
                {localDepartments.map((dept, idx) => (
                    <ListItem key={dept + idx} secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(dept)}>
                            <DeleteIcon />
                        </IconButton>
                    }>
                        <ListItemText primary={dept} />
                    </ListItem>
                ))}
            </List>
            <Stack direction="row" justifyContent="flex-end">
                <AnimateButton>
                    <Button variant="contained" sx={{ my: 3, ml: 1 }} onClick={() => { setErrorIndex(0); handleNextStep(); }}>
                        Next
                    </Button>
                </AnimateButton>
            </Stack>
        </>
    );
};

OrganizationStructureForm.propTypes = {
    departments: PropTypes.array,
    setDepartments: PropTypes.func,
    handleNext: PropTypes.func,
    setErrorIndex: PropTypes.func
};

export default OrganizationStructureForm;

// Example usage:
// import { useDispatch, useSelector } from 'react-redux';
// import { setDepartments } from 'store/slices/onBoardCompanyRegistration';
//
// const dispatch = useDispatch();
// const departments = useSelector((state) => state.onBoardCompanyRegistration.departments);
//
// <OrganizationStructureForm
//   departments={departments}
//   setDepartments={(depts) => dispatch(setDepartments(depts))}
//   handleNext={...}
//   setErrorIndex={...}
// />
