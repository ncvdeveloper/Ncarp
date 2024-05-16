import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        userDetails: { username: "", projectName: "", pageName: "", userId: "" },
    },
    reducers: {
        loginAuth: (state, action) => {
            state.user = action.payload.user;
        },
        logoutAuth: (state, action) => {
            state.user = {};
        },
        userDetails: (state, action) => {

            const { key, value } = action.payload;
            state.userDetails = {
                ...state.userDetails,
                [key]: value
            };
        },
    }
})

export const { loginAuth, logoutAuth, userDetails } = authSlice.actions;


export default authSlice.reducer