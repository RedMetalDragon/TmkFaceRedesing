import { useDispatch } from 'store';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import { Grid } from '@mui/material';
import { useSelector } from 'store';
import DirectoryTree from '../DirectoryTree';
import { FormattedMessage } from 'react-intl';
import { Button } from 'react-bootstrap';
import ControlledTreeView from 'views/ui-elements/advance/UITreeview/ControlledTreeView';
import SubCard from 'ui-component/cards/SubCard';
import { useTheme } from '@mui/material/styles';

// sampleTreeData.js

const AllFiles = () => {
    const [isLoading, setLoading] = useState(true);
    const treeDirectoryData = useSelector((state) => state.documents).treeDirectoryData;
    const theme = useTheme();

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing} sx={{ p: 2.5 }}>
            {/** */}
            <Grid item sm={12} xs={12} md={12} lg={12}></Grid>
            {/** */}
            <Grid container spacing={gridSpacing}>
                <Grid item sm={3} xs={3} md={4} lg={4} alignItems={'center'}>
                    {/* <Button variant="primary" style={{ backgroundColor: theme.palette.solids.tmkBlue }}>
                        <FormattedMessage id="expand-directory-all"></FormattedMessage>
                    </Button> */}
                </Grid>
                <Grid item sm={9} xs={9} md={8} lg={8}>
                    {/**OFFSET */}
                </Grid>
                <Grid item sm={3} xs={3} md={4} lg={4} alignContent={'center'}>
                    <SubCard title="">{<DirectoryTree treeDirectoryData={treeDirectoryData} />}</SubCard>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default AllFiles;
