// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';

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
                state: userState,
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

            state.employeeId = employee_id;
            state.firstName = first_name;
            state.middleName = middle_name;
            state.lastName = last_name;
            state.birthday = birthday;
            state.emailAddress = email_address;
            state.address1 = address_1;
            state.address2 = address_2;
            state.city = city;
            state.state = userState;
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

export const { hasError, fillUserData } = slice.actions;

// ----------------------------------------------------------------------

export const fillUserInfo = (employeeId) => async (dispatch) => {
    const response = await axios.get(`/brain/users/${employeeId}`);
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

// Reducer
export default slice.reducer;
