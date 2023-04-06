import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        email: '',
        name: '',
        isAdmin: '',
        token: ''
    },

    reducers: {
        login: (state, action) => {
            const data = action.payload;

            state.id = data.id;
            state.email = data.email;
            state.name = data.name;
            state.isAdmin =  data.isadmin;
        },

        setToken: (state, action) => {
            state.token =  action.payload;
        }
    }
});

export const {login, setToken} = userSlice.actions;

export default userSlice.reducer;
