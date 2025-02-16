import React from 'react';
import PropTypes from 'prop-types';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch, dispatch } from 'store';
import { setSelected, setExpanded } from 'store/slices/documents';

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
    // Style the content area
    // '& .MuiTreeItem-content': {
    //     background: 'linear-gradient(179.28deg, #30FFBE 0.62%, #00DF99 52.37%)', // tmkGreen
    //     color: '#fff',
    //     padding: '4px 8px',
    //     borderRadius: '4px',
    //     marginBottom: '2px',
    //     transition: 'background 0.3s'
    //},
    // Style for when the item is selected
    //'& .MuiTreeItem-content.Mui-selected, & .MuiTreeItem-content.Mui-selected:hover': {
    //background: '#F9EBEA', // tmkRedLigth
    //color: theme.palette.text.primary
    //},
    // Label styling
    // '& .MuiTreeItem-label': {
    //     fontWeight: 'inherit',
    //     color: 'inherit'
    // }
}));

const DirectoryTree = ({ treeDirectoryData, displayFiles = false }) => {
    const selected = useSelector((state) => state.documents).selected;
    const expanded = useSelector((state) => state.documents).expanded;

    const handleSelect = (event, nodesId) => {
        console.log('Node selected:', nodesId);
        dispatch(setSelected(nodesId));
    };

    const handleToggle = (event, nodesId) => {
        console.log('Node toggled:', nodesId);
        dispatch(setExpanded(nodesId));
    };

    const renderTree = (node) => {
        if (!node.children && !displayFiles) {
            return <></>;
        }
        return (
            <TreeItem key={node.id} nodeId={node.id} label={node.name} icon={node.children ? <FolderIcon /> : <InsertDriveFileIcon />}>
                {Array.isArray(node.children) && node.children.map((child) => renderTree(child))}
            </TreeItem>
        );
    };

    return (
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
    );
};
DirectoryTree.propTypes = {
    treeDirectoryData: PropTypes.object.isRequired,
    displayFiles: PropTypes.bool
};

export default DirectoryTree;

// return (
//     <TreeView
//         defaultCollapseIcon={<ExpandMoreIcon />}
//         defaultExpandIcon={<ChevronRightIcon />}
//         expanded={expanded}
//         selected={selected}
//         onNodeToggle={handleToggle}
//         onNodeSelect={handleSelect}
//     >
//         <TreeItem nodeId="1" label="Applications">
//             <TreeItem nodeId="2" label="Calendar" />
//             <TreeItem nodeId="3" label="Chrome" />
//             <TreeItem nodeId="4" label="Webstorm" />
//         </TreeItem>
//         <TreeItem nodeId="5" label="Documents">
//             <TreeItem nodeId="6" label="Material-UI">
//                 <TreeItem nodeId="7" label="src">
//                     <TreeItem nodeId="8" label="index.jsx" />
//                     <TreeItem nodeId="9" label="tree-view.js" />
//                 </TreeItem>
//             </TreeItem>
//         </TreeItem>
//     </TreeView>
// );
