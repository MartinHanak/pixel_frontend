import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { BACKEND_URL } from '../utils/config'
import store from '../store/store'
import fetchWithCredentials from '../utils/fetchWithCredentials'

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
export const fetchQuestion = createAsyncThunk('game/question', async () => {
    const jwt = store.getState().login.jwt;
    const response = await fetchWithCredentials(`${BACKEND_URL}/api/game/1/1`, jwt);

    const data = await response.json();
    console.log(response)
    return data;
})

export const { changeGame } = gameSlice.actions;

export const selectGame = (state: RootState) => state.game; 

export default gameSlice.reducer;