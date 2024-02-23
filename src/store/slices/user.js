// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    userFirstName: '',
    userLastName: '',
    email: 'mgr@gmail.com',
    displayName: '',
    photoURL: '',
    cover: '',
    phone: '786-322-1234',
    location: '',
    about: '',
    address: '',
    zipCode: '',
    usersS1: [],
    usersS2: [],
    followers: [],
    friendRequests: [],
    friends: [],
    gallery: [],
    posts: [],
    detailCards: [],
    simpleCards: [],
    profileCards: []
};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        fillPersonalInfo(state, action) {
            state.userFirstName = action.payload.userFirstName ? action.payload.userFirstName : state.userFirstName;
            state.userLastName = action.payload.userLastName ? action.payload.userLastName : state.userLastName;
            state.userMiddleName = action.payload.userMiddleName ? action.payload.userMiddleName : state.userMiddleName;
            state.email = action.payload.email ? action.payload.email : state.email;
            state.displayName = action.payload.displayName ? action.payload.displayName : state.displayName;
            state.photoURL = action.payload.photoURL ? action.payload.photoURL : '/static/images/placeholder.svg';
            state.cover = action.payload.cover ? action.payload.cover : '/static/images/placeholder.svg';
            state.phone = action.payload.phone ? action.payload.phone : state.phone;
            state.location = action.payload.location ? action.payload.location : state.location;
            state.about = action.payload.about ? action.payload.about : state.about;
            state.address = action.payload.address ? action.payload.address : state.address;
            state.zipCode = action.payload.zipCode ? action.payload.zipCode : state.zipCode;
        },

        // GET USERS STYLE 1
        getUsersListStyle1Success(state, action) {
            state.usersS1 = action.payload;
        },

        // GET USERS STYLE 2
        getUsersListStyle2Success(state, action) {
            state.usersS2 = action.payload;
        },

        // GET FOLLOWERS
        getFollowersSuccess(state, action) {
            state.followers = action.payload;
        },

        // FILTER FOLLOWERS
        filterFollowersSuccess(state, action) {
            state.followers = action.payload;
        },

        // GET FRIEND REQUESTS
        getFriendRequestsSuccess(state, action) {
            state.friendRequests = action.payload;
        },

        // FILTER FRIEND REQUESTS
        filterFriendRequestsSuccess(state, action) {
            state.friendRequests = action.payload;
        },

        // GET FRIENDS
        getFriendsSuccess(state, action) {
            state.friends = action.payload;
        },

        // FILTER FRIENDS
        filterFriendsSuccess(state, action) {
            state.friends = action.payload;
        },

        // GET GALLERY
        getGallerySuccess(state, action) {
            state.gallery = action.payload;
        },

        // GET POSTS
        getPostsSuccess(state, action) {
            state.posts = action.payload;
        },

        // EDIT COMMENT
        editCommentSuccess(state, action) {
            state.posts = action.payload;
        },

        // ADD COMMENT
        addCommentSuccess(state, action) {
            state.posts = action.payload;
        },

        // ADD REPLY
        addReplySuccess(state, action) {
            state.posts = action.payload;
        },

        // LIKE POST
        likePostSuccess(state, action) {
            state.posts = action.payload;
        },

        // LIKE COMMENT
        likeCommentSuccess(state, action) {
            state.posts = action.payload;
        },

        // LIKE REPLY
        likeReplySuccess(state, action) {
            state.posts = action.payload;
        },

        // GET DETAIL CARDS
        getDetailCardsSuccess(state, action) {
            state.detailCards = action.payload;
        },

        // FILTER DETAIL CARDS
        filterDetailCardsSuccess(state, action) {
            state.detailCards = action.payload;
        },

        // GET SIMPLE CARDS
        getSimpleCardsSuccess(state, action) {
            state.simpleCards = action.payload;
        },

        // FILTER SIMPLE CARDS
        filterSimpleCardsSuccess(state, action) {
            state.simpleCards = action.payload;
        },

        // GET PROFILE CARDS
        getProfileCardsSuccess(state, action) {
            state.profileCards = action.payload;
        },

        // FILTER PROFILE CARDS
        filterProfileCardsSuccess(state, action) {
            state.profileCards = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUsersListStyle1() {
    return async () => {
        try {
            const response = await axios.get('/api/user-list/s1/list');
            dispatch(slice.actions.getUsersListStyle1Success(response.data.users_s1));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getUsersListStyle2() {
    return async () => {
        try {
            const response = await axios.get('/api/user-list/s2/list');
            dispatch(slice.actions.getUsersListStyle2Success(response.data.users_s2));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getFollowers() {
    return async () => {
        try {
            const response = await axios.get('/api/followers/list');
            dispatch(slice.actions.getFollowersSuccess(response.data.followers));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function filterFollowers(key) {
    return async () => {
        try {
            const response = await axios.post('/api/followers/filter', { key });
            dispatch(slice.actions.filterFollowersSuccess(response.data.results));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getFriendRequests() {
    return async () => {
        try {
            const response = await axios.get('/api/friend-request/list');
            dispatch(slice.actions.getFriendRequestsSuccess(response.data.friends));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function filterFriendRequests(key) {
    return async () => {
        try {
            const response = await axios.post('/api/friend-request/filter', { key });
            dispatch(slice.actions.filterFriendRequestsSuccess(response.data.results));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getFriends() {
    return async () => {
        try {
            const response = await axios.get('/api/friends/list');
            dispatch(slice.actions.getFriendsSuccess(response.data.friends));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function filterFriends(key) {
    return async () => {
        try {
            const response = await axios.post('/api/friends/filter', { key });
            dispatch(slice.actions.filterFriendsSuccess(response.data.results));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getGallery() {
    return async () => {
        try {
            const response = await axios.get('/api/gallery/list');
            dispatch(slice.actions.getGallerySuccess(response.data.gallery));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getPosts() {
    return async () => {
        try {
            const response = await axios.get('/api/posts/list');
            dispatch(slice.actions.getPostsSuccess(response.data.posts));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function editComment(key, id) {
    return async () => {
        try {
            const response = await axios.post('/api/posts/editComment', { key, id });
            dispatch(slice.actions.editCommentSuccess(response.data.posts));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function addComment(postId, comment) {
    return async () => {
        try {
            const response = await axios.post('/api/comments/add', { postId, comment });
            dispatch(slice.actions.addCommentSuccess(response.data.posts));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function addReply(postId, commentId, reply) {
    return async () => {
        try {
            const response = await axios.post('/api/replies/add', { postId, commentId, reply });
            dispatch(slice.actions.addReplySuccess(response.data.posts));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function likePost(postId) {
    return async () => {
        try {
            const response = await axios.post('/api/posts/list/like', { postId });
            dispatch(slice.actions.likePostSuccess(response.data.posts));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function likeComment(postId, commentId) {
    return async () => {
        try {
            const response = await axios.post('/api/comments/list/like', { postId, commentId });
            dispatch(slice.actions.likeCommentSuccess(response.data.posts));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function likeReply(postId, commentId, replayId) {
    return async () => {
        try {
            const response = await axios.post('/api/replies/list/like', { postId, commentId, replayId });
            dispatch(slice.actions.likeReplySuccess(response.data.posts));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getDetailCards() {
    return async () => {
        try {
            const response = await axios.get('/api/details-card/list');
            dispatch(slice.actions.getDetailCardsSuccess(response.data.users));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function filterDetailCards(key) {
    return async () => {
        try {
            const response = await axios.post('/api/details-card/filter', { key });
            dispatch(slice.actions.filterDetailCardsSuccess(response.data.results));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getSimpleCards() {
    return async () => {
        try {
            const response = await axios.get('/api/simple-card/list');
            dispatch(slice.actions.getSimpleCardsSuccess(response.data.users));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function filterSimpleCards(key) {
    return async () => {
        try {
            const response = await axios.post('/api/simple-card/filter', { key });
            dispatch(slice.actions.filterSimpleCardsSuccess(response.data.results));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getProfileCards() {
    return async () => {
        try {
            const response = await axios.get('/api/profile-card/list');
            dispatch(slice.actions.getProfileCardsSuccess(response.data.users));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function filterProfileCards(key) {
    return async () => {
        try {
            const response = await axios.post('/api/profile-card/filter', { key });
            dispatch(slice.actions.filterProfileCardsSuccess(response.data.results));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function fillPersonalInfo() {
    return async (dispatch) => {
        try {
            const response = await axios.get('/users/dashboard');
            const mappedData = {
                userFirstName: response.data.employee_fname,
                userLastName: response.data.employee_lname,
                userMiddleName: response.data.employee_lname,
                email: response.data.email,
                displayName: response.data.displayName,
                photoURL: response.data.photoURL,
                cover: response.data.cover,
                phone: response.data.phone,
                location: response.data.location,
                about: response.data.about,
                address: response.data.address,
                zipCode: response.data.zipCode
            };
            dispatch(slice.actions.fillPersonalInfo(mappedData));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
