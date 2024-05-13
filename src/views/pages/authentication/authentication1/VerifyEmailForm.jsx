import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@mui/material';

const VerifyEmailForm = ({ showTextField, message }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h4>{message}</h4>
            </Grid>
            <Grid item xs={12}>
                {showTextField && <TextField label="Enter the code we send to your email address" />}
            </Grid>
        </Grid>
    );
};

export default VerifyEmailForm;
