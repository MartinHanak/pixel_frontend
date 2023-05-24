import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { login } from './login'
import { register } from './register'
import { SerializedError } from '@reduxjs/toolkit'
import { access } from 'fs'

interface loginState {
    username: string,
    jwt: string,
    error: SerializedError | null,
    status: string
}

const initialLoginState: loginState = {
    username: localStorage.getItem("username") || '',
    jwt: localStorage.getItem("jwt") || '',
    error: null,
    status: 'idle'
}


export const loginSlice = createSlice({
    name: 'login',
    initialState: initialLoginState,
    reducers: {
        logout: state => {
            localStorage.setItem("username", '');
            localStorage.setItem("jwt", '');
            state.username = '',
            state.jwt = ''
        },
        resetErrors: state => {
            state.error = null
        }
    }, extraReducers: (builder) =>  {
        builder 
        .addCase(login.fulfilled, (state, action) => {
            state.status = 'idle';
            state.username = action.payload.username;
            state.jwt = action.payload.jwt;
            state.error = null
        })
        .addCase(login.rejected, (state, action) => {
             state.status = 'idle';
            state.error = action.error;
        })
        .addCase(login.pending, (state,action) => {
            state.status = 'pending'
        })
        .addCase(register.fulfilled, (state, action ) => {
             state.status = 'idle';
            state.username = action.payload.username;
            state.jwt = action.payload.jwt;
            state.error = null
        })
        .addCase(register.rejected, (state, action) => {
             state.status = 'idle';
            state.error = action.error;
        })
        .addCase(register.pending, (state, action) => {
            state.status = 'pending';
        })
    }
})

export const { logout, resetErrors } = loginSlice.actions;

export const selectLogin = (state: RootState) => state.login 

export default loginSlice.reducer