import {createSlice} from '@reduxjs/toolkit';


const INITIAL_STATE = {
    uid: null,
    displayName: null,
    email: null,
    loggedIn: false
};


export const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        setActiveUser: (state, action) => {
            state.uid = action.payload.uid;
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.loggedIn = true;
        },
        setUserLoggedOut: (state) => {
            Object.assign(state, INITIAL_STATE);
        }
    },
});

export const {
    setActiveUser,
    setUserLoggedOut
} = userSlice.actions;


export default userSlice.reducer;
