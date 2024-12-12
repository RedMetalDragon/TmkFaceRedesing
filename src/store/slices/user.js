// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    employeeId: null,
    firstName: '',
    middleName: '',
    lastName: '',
    birthday: '',
    emailAddress: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    joiningDate: '',
    status: '',
    division: '',
    department: '',
    jobTitle: '',
    manager: {},
    // Other existing properties
    userFirstName: '',
    userLastName: '',
    gender: '',
    companyEmailAdress: '',
    displayName: '',
    photoURL: '',
    cover: '',
    phone: '',
    location: '',
    about: '',
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

        fillUserData(state, action) {
            state.userFirstName = action.payload.first_name ? action.payload.first_name : state.userFirstName;
            state.userLastName = action.payload.last_name ? action.payload.last_name : state.userLastName;
            state.birthday = action.payload.birthday ? action.payload.birthday : state.birthday;
            state.gender = action.payload.gender ? action.payload.gender : state.gender;
            state.userMiddleName = action.payload.userMiddleName ? action.payload.userMiddleName : state.userMiddleName;
            state.phone = action.payload.contact_number ? action.payload.contact_number : state.phone;
            state.email = action.payload.email_address ? action.payload.email_address : state.email;
            state.companyEmailAdress = action.payload.company_email_address
                ? action.payload.company_email_address
                : state.companyEmailAdress;
            state.address1 = action.payload.address_1 ? action.payload.address_1 : state.address1;
            state.address2 = action.payload.address_2 ? action.payload.address_2 : state.address2;
            state.city = action.payload.city ? action.payload.city : state.city;
            state.state = action.payload.state ? action.payload.state : state.state;
            state.zipCode = action.payload.zip_code ? action.payload.zip_code : state.zipCode;
            state.country = action.payload.country ? action.payload.country : state.country;
            state.joiningDate = action.payload.joining_date ? action.payload.joining_date : state.joiningDate;
            state.status = action.payload.status ? action.payload.status : state.status;
            state.division = action.payload.division ? action.payload.division : state.division;
            state.department = action.payload.department ? action.payload.department : state.department;
            state.jobTitle = action.payload.job_title ? action.payload.job_title : state.jobTitle;
            state.managerFirstName = action.payload.manager.first_name ? action.payload.manager.first_name : state.managerFirstName;
            state.managerLastName = action.payload.manager.last_name ? action.payload.manager.last_name : state.managerLastName;
            // TODO - These are not already implemented in the backend
            state.displayName = action.payload.displayName ? action.payload.displayName : state.displayName;
            state.photoURL = action.payload.photoURL ? action.payload.photoURL : '/static/images/placeholder.svg';
            state.cover = action.payload.cover ? action.payload.cover : '/static/images/placeholder.svg';
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

export function fillUserInfo(personalData) {
    return async (dispatch) => {
        try {
            dispatch(slice.actions.fillUserData(personalData));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
