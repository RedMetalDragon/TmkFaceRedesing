// material-ui
import { Grid } from '@mui/material';

// project import
import InitialState from './InitialState';
import UseGridSelector from './UseGridSector';
import { gridSpacing } from 'store/constant';

// ==============================|| SAVE & RESTORE STATE DATA GRID ||============================== //

export default function SaveRestoreState() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <InitialState />
            </Grid>
            <Grid item xs={12}>
                <UseGridSelector />
            </Grid>
        </Grid>
    );
}
