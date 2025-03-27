import React, { useEffect, useRef } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Stack, Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useSelector, useDispatch } from 'store';
import { setCurrentFolder, setSelected, goBackFolder } from 'store/slices/documents';
import ShareIcon from '@mui/icons-material/Share';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme, useMediaQuery } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';

const FilesList = () => {
    const dispatch = useDispatch();
    const currentFolder = useSelector((state) => state.documents.currentFolder);
    const selected = useSelector((state) => state.documents.selected);
    const listRef = useRef(null);
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

    const handleItemClick = (item) => {
        if (item.children) {
            dispatch(setCurrentFolder(item));
            dispatch(setSelected(item.id));
        } else {
            dispatch(setSelected(item.id));
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!currentFolder.children?.length) return;

            const currentIndex = currentFolder.children.findIndex(item => item.id === selected);
            let nextIndex;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    nextIndex = currentIndex < currentFolder.children.length - 1 ? currentIndex + 1 : currentIndex;
                    dispatch(setSelected(currentFolder.children[nextIndex].id));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
                    dispatch(setSelected(currentFolder.children[nextIndex].id));
                    break;
                case 'Enter':
                    const selectedItem = currentFolder.children[currentIndex];
                    if (selectedItem?.children) {
                        dispatch(setCurrentFolder(selectedItem));
                    }
                    break;
                case 'Backspace':
                    dispatch(goBackFolder());
                    break;
                default:
                    break;
            }
        };

        const listElement = listRef.current;
        if (listElement) {
            listElement.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (listElement) {
                listElement.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [currentFolder, selected, dispatch]);

    // Auto-scroll to selected item
    useEffect(() => {
        const selectedElement = document.querySelector('.Mui-selected');
        if (selectedElement) {
            selectedElement.scrollIntoView({ block: 'nearest' });
        }
    }, [selected]);

    const renderListItems = () => {
        if (!currentFolder.children?.length) {
            return (
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
            );
        }

        return (
            <List>
                {currentFolder.children.map((item) => (
                    <ListItem
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        selected={selected === item.id}
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: 'action.hover'
                            },
                            '&.Mui-selected': {
                                backgroundColor: 'primary.light',
                                '&:hover': {
                                    backgroundColor: 'primary.light'
                                }
                            },
                            borderRadius: 1,
                            mb: 0.5
                        }}
                    >
                        <ListItemIcon>
                            {item.children ?
                                <FolderIcon color="primary" /> :
                                <InsertDriveFileIcon color="action" />
                            }
                        </ListItemIcon>
                        <ListItemText
                            primary={item.name}
                            primaryTypographyProps={{
                                style: {
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap'
                                }
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        );
    };

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box
                ref={listRef}
                sx={{ flex: 1, overflow: 'auto', mt: -1 }}
                tabIndex={0}
            >
                {renderListItems()}
            </Box>
        </Box>
    );
};

export default FilesList;