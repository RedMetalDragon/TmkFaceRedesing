import React from 'react';
import { Stack, Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme, useMediaQuery } from '@mui/material';

const ActionButtons = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const handleMoreClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMoreClose = () => {
        setAnchorEl(null);
    };

    return (
        <Stack 
            direction="row" 
            spacing={1} 
            alignItems="center" 
            justifyContent="flex-end"
            sx={{ 
                overflowX: 'auto',
                py: 1
            }}
        >
            {!isMobile ? (
                <>
                    <Button
                        variant="contained"
                        startIcon={<ShareIcon />}
                        size="small"
                    >
                        Share With
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<CloudDownloadIcon />}
                        size="small"
                    >
                        Download
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        size="small"
                    >
                        Upload
                    </Button>
                </>
            ) : (
                <>
                    <Tooltip title="Share With">
                        <IconButton size="small" color="primary">
                            <ShareIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                        <IconButton size="small" color="primary">
                            <CloudDownloadIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Upload">
                        <IconButton size="small" color="primary">
                            <CloudUploadIcon />
                        </IconButton>
                    </Tooltip>
                </>
            )}
            <Tooltip title="More Actions">
                <IconButton 
                    size="small" 
                    onClick={handleMoreClick}
                    color="primary"
                >
                    <MoreVertIcon />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMoreClose}
            >
                <MenuItem onClick={handleMoreClose}>Move</MenuItem>
                <MenuItem onClick={handleMoreClose}>Copy</MenuItem>
                <MenuItem onClick={handleMoreClose}>Delete</MenuItem>
                <MenuItem onClick={handleMoreClose}>Rename</MenuItem>
            </Menu>
        </Stack>
    );
};

export default ActionButtons;