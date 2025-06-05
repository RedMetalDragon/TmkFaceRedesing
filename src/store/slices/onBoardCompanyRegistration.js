import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: null,
    currentStep: 0,
    // Step 1
    companyInfo: {
        name: '',
        industry: '', // dropdown
        address: ''
    },
    // Step 2
    departments: [], // e.g. ['Sales', 'Engineering']
    // Step 3
    primaryAdmin: {
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        phone: '' // Added phone number field
    },
    // Step 4
    policy: {
        workingHours: '', // dropdown
        probationPeriod: '', // dropdown
        ptoPolicy: '', // dropdown
        allowWorkFromHome: false
    },
    // Step 5
    verified: false
};

const slice = createSlice({
    name: 'onBoardCompanyRegistration',
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload;
        },
        setCurrentStep(state, action) {
            state.currentStep = action.payload;
        },
        setCompanyInfo(state, action) {
            state.companyInfo = { ...state.companyInfo, ...action.payload };
        },
        setDepartments(state, action) {
            state.departments = action.payload;
        },
        setPrimaryAdmin(state, action) {
            state.primaryAdmin = { ...state.primaryAdmin, ...action.payload };
        },
        setPolicy(state, action) {
            state.policy = { ...state.policy, ...action.payload };
        },
        setVerified(state, action) {
            state.verified = action.payload;
        },
        resetOnBoarding(state) {
            Object.assign(state, initialState);
        }
    }
});

export default slice.reducer;
export const { hasError, setCurrentStep, setCompanyInfo, setDepartments, setPrimaryAdmin, setPolicy, setVerified, resetOnBoarding } = slice.actions;

// Example async action usage (if needed)
// export function saveCompanyInfo(data) {
//     return async () => {
//         try {
//             dispatch(slice.actions.setCompanyInfo(data));
//         } catch (error) {
//             dispatch(slice.actions.hasError(error.message));
//         }
//     };
// }
