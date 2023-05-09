import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { BACKEND_URL } from '../utils/config'
import fetchWithCredentials from '../utils/fetchWithCredentials'
import { fetchSSEQuestion } from './fetchSSEQuestion'
import { answerQuestion } from './answerQuestion'
import { initializeGame } from './initializeGame'
import { createGame } from './createGame'

export interface OptionInterface {
    A: string,
    B: string,
    C: string,
    D: string
}

export interface question {
    intro: string,
    question: string,
    options: OptionInterface
}

export interface gameState {
    gameId: number | null,
    questionOrder : number | null
    currentQuestion: question | null,
    error: SerializedError | null,
    status: string | null,
    gameover: boolean,
    win: boolean
}

const initialState : gameState  = {
    gameId: null,
    questionOrder: null,
    currentQuestion: null,
    status: 'idle',
    error: null,
    gameover: false,
    win: false
}


export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        changeGame: (state, action: PayloadAction<number>) => {
            state.gameId = action.payload;
        },
        resetGameState: () => {
           return {...initialState};
        }
    },
    extraReducers:  (builder) => {
        builder 
            .addCase(createGame.fulfilled, (state, action) => {
                state.gameId = action.payload.gameId;
                state.questionOrder = 1;
                state.status = 'idle';
            })
            .addCase(createGame.rejected, (state, action) => {
                console.log(action.error)
                state.error = action.error
            })

            .addCase(initializeGame.fulfilled, (state, action) => {
                console.log(action.payload)
                state.gameId = action.payload.gameId;
                state.questionOrder = action.payload.questionOrder;
            })
            .addCase(initializeGame.rejected, (state, action) => {
                console.log(action.error)
                state.error = action.error
            })

            .addCase(fetchSSEQuestion.pending, (state, action) => {
                if (state.status === 'idle') {
                    state.status = 'pending'
                }
            })

            .addCase(fetchSSEQuestion.fulfilled, (state, action) => {
                if (state.status === 'pending') {
                    state.status = 'idle'
                }
                state.currentQuestion = action.payload;
                console.log(action.payload)
            })

            .addCase(fetchSSEQuestion.rejected, (state, action) => {
                if (state.status === 'pending') {
                    state.status = 'idle'
                }
                state.error = action.error;
                console.log(action.error)
            })

            .addCase(answerQuestion.fulfilled, (state, action) => {
                console.log(action.payload)
                if(action.payload.correctlyAnswered) {
                    state.questionOrder ? state.questionOrder += 1 : state.questionOrder = 2;
                } else {
                    state.gameover = true;
                }
            })

            .addCase(answerQuestion.rejected, (state, action) => {
                console.log(action.error)
                state.error = action.error
            })
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

// Server sent events version


export const { changeGame, resetGameState } = gameSlice.actions;

export const selectGame = (state: RootState) => state.game; 

export default gameSlice.reducer;