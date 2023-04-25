import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { BACKEND_URL } from '../utils/config'
import fetchWithCredentials from '../utils/fetchWithCredentials'

import { EventSourcePolyfill } from 'event-source-polyfill';

interface OptionInterface {
    A: string,
    B: string,
    C: string,
    D: string
}

interface question {
    intro: string,
    question: string,
    options: OptionInterface
}

interface gameState {
    gameId: number | null,
    currentQuestion: question | null,
    nextQuestion: question | null
}

const initialState : gameState  = {
    gameId: null,
    currentQuestion: null,
    nextQuestion: null
}


export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        changeGame: (state, action: PayloadAction<number>) => {
            state.gameId = action.payload;
        }
    }
})


// async thunks
// type = return /  first arg for payload creator / thunkApi field types


export const fetchQuestion = createAsyncThunk<unknown,{gameId: number, questionOrder: number},{state:RootState}>('game/question', 
async (arg, thunkAPI) => {
    const jwt = thunkAPI.getState().login.jwt;
    //const jwt = store.getState().login.jwt;
    const response = await fetchWithCredentials(`${BACKEND_URL}/api/game/${arg.gameId}/${arg.questionOrder}`, jwt);

    const data = await response.json();
    console.log(data)
    return data;
})

export const fetchSSEQuestion = createAsyncThunk<unknown,{gameId: number, questionOrder: number},{state:RootState}>('game/questionSSE', async (arg,thunkAPI) => {

    const jwt = thunkAPI.getState().login.jwt;

    const eventSource =  new EventSourcePolyfill(`${BACKEND_URL}/api/gameSSE/${arg.gameId}/${arg.questionOrder}`,{
        headers: {
            'Authorization' : `Bearer ${jwt}`
        }
    });

    eventSource.onmessage = (e) => {
        eventSource.close()
        console.log(e.data)
    }

    return 0
})

export const { changeGame } = gameSlice.actions;

export const selectGame = (state: RootState) => state.game; 

export default gameSlice.reducer;