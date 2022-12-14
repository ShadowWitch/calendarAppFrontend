
import { createSlice } from '@reduxjs/toolkit';




export const authSlice = createSlice({
    name: 'template',
    initialState: {
        status: 'checking', // authenticated, not-authenticated
        user: {},
        errorMessage: undefined
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking'
            state.user = {}
            state.errorMessage = undefined
        },
        onLogin: (state, action) => {
            state.status = 'authenticated'
            state.user = action.payload
            state.errorMessage = undefined
        },
        

    }
})




export const {onChecking, onLogin} = authSlice.actions;