import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';

// slice for documents and storage
const initialState = {
    treeDirectoryData: {
        id: 'root',
        name: 'Root Directory',
        children: [
            {
                id: 'folder1',
                name: 'Folder 1',
                children: [
                    { id: 'file1', name: 'File 1' },
                    { id: 'file2', name: 'File 2' }
                ]
            },
            {
                id: 'folder2',
                name: 'Folder 2',
                children: [{ id: 'file3', name: 'File 3' }]
            }
        ]
    },
    currentFolder: {
        id: 'root',
        name: 'Root Directory',
        children: [
            {
                id: 'folder1',
                name: 'Folder 1',
                children: [
                    { id: 'file1', name: 'File 1' },
                    { id: 'file2', name: 'File 2' }
                ]
            },
            {
                id: 'folder2',
                name: 'Folder 2',
                children: [{ id: 'file3', name: 'File 3' }]
            }
        ]
    },
    documents: [],
    storage: [],
    expanded: [],
    selected: [],
    currentStorageMB: 0,
    totalStorageMB: 1024,
    error: null
};

// New helper function to find the parent folder recursively
function findParentFolder(node, targetId, parent = null) {
    if (node.id === targetId) return parent;
    if (node.children && node.children.length) {
        for (let child of node.children) {
            const result = findParentFolder(child, targetId, node);
            if (result) return result;
        }
    }
    return null;
}

const slice = createSlice({
    name: 'documents',
    initialState,
    reducers: {
        setDocuments: (state, action) => {
            state.documents = action.payload;
        },
        setStorage: (state, action) => {
            state.storage = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setExpanded: (state, action) => {
            state.expanded = action.payload;
        },
        setSelected: (state, action) => {
            state.selected = action.payload;
        },
        setTreeDirctoryData: (state, action) => {
            state.treeDirectoryData = action.payload;
            state.currentFolder = action.payload;
        },
        setCurrentFolder: (state, action) => {
            state.currentFolder = action.payload;
        },
        // New reducer to go back to the parent folder if available
        goBackFolder: (state) => {
            if (state.currentFolder.id !== state.treeDirectoryData.id) {
                const parent = findParentFolder(state.treeDirectoryData, state.currentFolder.id);
                if (parent) {
                    state.currentFolder = parent;
                } else {
                    state.error = { message: "Parent folder not found." };
                }
            }
        }
    }
});

export const {
    setDocuments,
    setStorage,
    setError,
    setExpanded,
    setSelected,
    setCurrentFolder,
    goBackFolder
} = slice.actions;

export const getDocuments = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/documents');
        if (response.status === 200) {
            dispatch(setDocuments(response.data));
        } else {
            throw new Error('Failed to fetch documents');
        }
    } catch (error) {
        dispatch(setError({ message: error.message }));
    }
};

export const getStorage = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/storage');
        if (response.status === 200) {
            dispatch(setStorage(response.data));
        } else {
            throw new Error('Failed to fetch storage');
        }
    } catch (error) {
        dispatch(setError({ message: error.message }));
    }
};

export default slice.reducer;
