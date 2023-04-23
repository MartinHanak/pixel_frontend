import {configureStore } from '@reduxjs/toolkit'
import loginReducer from '../reducers/loginSlice'
import gameReducer from '../reducers/gameSlice';

const store = configureStore({
    reducer: {
        login: loginReducer,
        game: gameReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch