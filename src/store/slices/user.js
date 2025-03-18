// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';

// ----------------------------------------------------------------------

const initialState = {
    user_id: null,
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
    roleId: null,
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
        setUserId(state, action) {
            state.user_id = action.payload;
        },

        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        fillUserData(state, action) {
            const {
                employee_id,
                first_name,
                middle_name,
                last_name,
                birthday,
                email_address,
                address_1,
                address_2,
                city,
                zip_code,
                country,
                joining_date,
                status,
                role_id,
                division,
                department,
                job_title,
                manager
            } = action.payload;

            state.user_id = employee_id;
            state.firstName = first_name;
            state.middleName = middle_name;
            state.lastName = last_name;
            state.birthday = birthday;
            state.emailAddress = email_address;
            state.address1 = address_1;
            state.address2 = address_2;
            state.city = city;
            state.zipCode = zip_code;
            state.country = country;
            state.joiningDate = joining_date;
            state.status = status;
            state.roleId = role_id;
            state.division = division;
            state.department = department;
            state.jobTitle = job_title;
            state.manager = manager;
        }
    }
});

export const { hasError, fillUserData, setUserId } = slice.actions;

// ----------------------------------------------------------------------

export const fillUserInfo = (user_id) => async (dispatch) => {
    const response = await axios.get(`/brain/users/${user_id}`);
    const employeeData = response.data;
    try {
        if (response.status === 200) {
            dispatch(fillUserData(employeeData));
        } else {
            throw new Error('Failed to get employee data');
        }
    } catch (error) {
        dispatch(hasError(error));
    }
};

export const fillUserId = (user_id) => async (dispatch) => {
    try {
        if (user_id) {
            dispatch(setUserId(user_id));
        } else {
            throw new Error('Invalid user ID');
        }
    } catch (error) {
        dispatch(hasError(error));
    }
};

// Reducer
export default slice.reducer;
