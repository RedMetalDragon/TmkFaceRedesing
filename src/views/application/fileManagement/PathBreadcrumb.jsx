import React from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useSelector, useDispatch } from 'store';
import { setCurrentFolder } from 'store/slices/documents';

const PathBreadcrumb = () => {
    const dispatch = useDispatch();
    const currentFolder = useSelector((state) => state.documents.currentFolder);
    const treeDirectoryData = useSelector((state) => state.documents.treeDirectoryData);

    const buildPath = (folder, path = []) => {
        if (folder.id === 'root') {
            return [folder];
        }
        
        const findFolderPath = (node, targetId, currentPath = []) => {
            if (node.id === targetId) {
                return [...currentPath, node];
            }
            if (node.children) {
                for (const child of node.children) {
                    const path = findFolderPath(child, targetId, [...currentPath, node]);
                    if (path) return path;
                }
            }
            return null;
        };

        return findFolderPath(treeDirectoryData, folder.id, []);
    };

    const path = buildPath(currentFolder);

    const handleClick = (folder) => {
        dispatch(setCurrentFolder(folder));
    };

    return (
        <Box 
            sx={{ 
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                '&::-webkit-scrollbar': {
                    height: 8
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: 'background.paper'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'divider',
                    borderRadius: 4
                }
            }}
        >
            <Breadcrumbs 
                separator={<NavigateNextIcon fontSize="small" />} 
                aria-label="directory path"
                sx={{ 
                    whiteSpace: 'nowrap',
                    '& .MuiBreadcrumbs-separator': {
                        mx: 1
                    }
                }}
            >
                {path?.map((folder, index) => {
                    const isLast = index === path.length - 1;
                    return isLast ? (
                        <Typography 
                            key={folder.id} 
                            color="text.primary"
                            sx={{
                                display: 'inline-block'
                            }}
                        >
                            {folder.name}
                        </Typography>
                    ) : (
                        <Link
                            key={folder.id}
                            underline="hover"
                            color="inherit"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(folder);
                            }}
                            sx={{ 
                                cursor: 'pointer',
                                display: 'inline-block'
                            }}
                        >
                            {folder.name}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </Box>
    );
};

export default PathBreadcrumb;