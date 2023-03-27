import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'

interface loginState {
    username: string,
    jwt: string
}

const initialLoginState: loginState = {
    username: '',
    jwt: ''
}


export const loginSlice = createSlice({
    name: 'login',
    initialState: initialLoginState,
    reducers: {
        logout: state => {
            state.username = '',
            state.jwt = ''
        },
        login: (state, action: PayloadAction<loginState>) => {
            state.username = action.payload.username,
            state.jwt = action.payload.jwt
        }
    }
})

export const { logout, login } = loginSlice.actions;

export const selectLogin = (state: RootState) => state.login 

export default loginSlice.reducer