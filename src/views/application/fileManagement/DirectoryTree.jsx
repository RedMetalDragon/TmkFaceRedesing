import React from 'react';
import PropTypes from 'prop-types';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FolderIcon from '@mui/icons-material/Folder';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'store';
import { setSelected, setExpanded, setCurrentFolder } from 'store/slices/documents';

const DirectoryTree = ({ treeDirectoryData }) => {
    const dispatch = useDispatch();
    const selected = useSelector((state) => state.documents.selected);
    const expanded = useSelector((state) => state.documents.expanded);

    const handleSelect = (event, nodeId) => {
        dispatch(setSelected(nodeId));
        
        // Find the selected folder in the tree
        const findFolder = (node) => {
            if (node.id === nodeId) return node;
            if (node.children) {
                for (const child of node.children) {
                    const found = findFolder(child);
                    if (found) return found;
                }
            }
            return null;
        };

        const selectedFolder = findFolder(treeDirectoryData);
        if (selectedFolder?.children) {
            dispatch(setCurrentFolder(selectedFolder));
        }
    };

    const handleToggle = (event, nodeIds) => {
        dispatch(setExpanded(nodeIds));
    };

    const renderTree = (node) => {
        if (!node.children) return null;
        
        return (
            <TreeItem 
                key={node.id} 
                nodeId={node.id} 
                label={node.name} 
                icon={<FolderIcon color="primary" />}
            >
                {Array.isArray(node.children) && 
                    node.children
                        .filter(child => child.children)
                        .map((child) => renderTree(child))
                }
            </TreeItem>
        );
    };

    return (
        <Box sx={{ height: '100%', overflow: 'auto' }}>
            <TreeView
                selected={selected}
                expanded={expanded}
                onNodeSelect={handleSelect}
                onNodeToggle={handleToggle}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {renderTree(treeDirectoryData)}
            </TreeView>
        </Box>
    );
};

DirectoryTree.propTypes = {
    treeDirectoryData: PropTypes.object.isRequired
};

export default DirectoryTree;
