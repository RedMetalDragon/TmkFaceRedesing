import { useEffect, useState } from 'react';
import { Box, Paper, useTheme, useMediaQuery } from '@mui/material';
import { useSelector } from 'store';
import DirectoryTree from '../DirectoryTree';
import FilesList from '../FilesList';
import PathBreadcrumb from '../PathBreadcrumb';
import ActionButtons from '../ActionButtons';
import MainCard from 'ui-component/cards/MainCard';
import MobileFileView from '../MobileFileView';

const AllFiles = () => {
    const [isLoading, setLoading] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const treeDirectoryData = useSelector((state) => state.documents.treeDirectoryData);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <Box sx={{ mb: 2 }}>
                <ActionButtons />
            </Box>
            <MainCard>
                <Box sx={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
                    {/* Path breadcrumb */}
                    <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                        <PathBreadcrumb />
                    </Box>

                    {/* Main content area */}
                    {isMobile ? (
                        // Mobile view
                        <Box sx={{ flex: 1, p: 2, overflow: 'hidden' }}>
                            <Paper elevation={1} sx={{ height: '100%', overflow: 'hidden', p: 2 }}>
                                <MobileFileView />
                            </Paper>
                        </Box>
                    ) : (
                        // Desktop view with split panels
                        <Box sx={{ flex: 1, display: 'flex', gap: 2, p: 2, overflow: 'hidden' }}>
                            {/* Left sidebar with folder tree */}
                            <Paper elevation={1} sx={{ width: 280, overflow: 'hidden', p: 2 }}>
                                <DirectoryTree treeDirectoryData={treeDirectoryData} />
                            </Paper>

                            {/* Right content area with files list */}
                            <Paper elevation={1} sx={{ flex: 1, overflow: 'hidden', p: 2 }}>
                                <FilesList />
                            </Paper>
                        </Box>
                    )}
                </Box>
            </MainCard>
        </>
    );
};

export default AllFiles;
