import React from 'react';
import { useSelector, useDispatch } from 'store';
import { Box, List, ListItem, ListItemIcon, ListItemText, IconButton, Stack, Typography, Menu, MenuItem, Tooltip } from '@mui/material';
import { IconChevronLeft, IconFolder, IconFile } from '@tabler/icons-react';
import ShareIcon from '@mui/icons-material/Share';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { setCurrentFolder, goBackFolder } from 'store/slices/documents';

const MobileFileView = () => {
    const dispatch = useDispatch();
    const currentFolder = useSelector((state) => state.documents.currentFolder);
    const treeDirectoryData = useSelector((state) => state.documents.treeDirectoryData);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMoreClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMoreClose = () => {
        setAnchorEl(null);
    };

    const handleItemClick = (item) => {
        if (item.children) {
            dispatch(setCurrentFolder(item));
        }
    };

    const handleBack = () => {
        dispatch(goBackFolder());
    };

    const isRootFolder = currentFolder.id === treeDirectoryData.id;

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header with back button if not in root */}
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                    mb: 2,
                    borderBottom: 1,
                    borderColor: 'divider',
                    pb: 1
                }}
            >
                {!isRootFolder && (
                    <IconButton onClick={handleBack} size="small">
                        <IconChevronLeft />
                    </IconButton>
                )}
                <Typography variant="h6" sx={{ flex: 1 }}>
                    {currentFolder.name}
                </Typography>
            </Stack>

            {/* Files and folders list */}
            <Box sx={{ flex: 1, overflow: 'auto' }}>
                {!currentFolder.children?.length ? (
                    <Box
                        sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.secondary',
                                fontStyle: 'italic'
                            }}
                        >
                            This folder is empty
                        </Typography>
                    </Box>
                ) : (
                    <List disablePadding>
                        {currentFolder.children?.map((item) => (
                            <ListItem
                                key={item.id}
                                onClick={() => handleItemClick(item)}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: 'action.hover'
                                    },
                                    borderRadius: 1,
                                    mb: 0.5
                                }}
                            >
                                <ListItemIcon>
                                    {item.children ? (
                                        <IconFolder color="primary" />
                                    ) : (
                                        <IconFile />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.name}
                                    primaryTypographyProps={{
                                        sx: {
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap'
                                        }
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
        </Box>
    );
};

export default MobileFileView;