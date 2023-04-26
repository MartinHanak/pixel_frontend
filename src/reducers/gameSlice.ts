import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { BACKEND_URL } from '../utils/config'
import fetchWithCredentials from '../utils/fetchWithCredentials'

import {  EventSourcePolyfill } from 'event-source-polyfill';

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
    nextQuestion: question | null,
    error: SerializedError | null,
    status: string | null
}

const initialState : gameState  = {
    gameId: null,
    currentQuestion: null,
    nextQuestion: null,
    status: 'idle',
    error: null
}


export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        changeGame: (state, action: PayloadAction<number>) => {
            state.gameId = action.payload;
        }
    },
    extraReducers:  (builder) => {
        builder 
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

export const fetchSSEQuestion = createAsyncThunk<question | null, {gameId: number, questionOrder: number},{state:RootState}>('game/questionSSE', async (arg,thunkAPI) => {

    const jwt = thunkAPI.getState().login.jwt;

    let nextQuestion : question | null = null;

    try {
        const eventSource =  new EventSourcePolyfill(`${BACKEND_URL}/api/gameSSE/${arg.gameId}/${arg.questionOrder}`,{
            headers: {
                'Authorization' : `Bearer ${jwt}`
            }
        });

        const firstMessagePromise = new Promise((resolve, reject) => {
            eventSource.onmessage = (e) => {
                eventSource.close()

                const jsonData = JSON.parse(e.data);
                if(jsonData.intro && jsonData.question && jsonData.options) {
                    nextQuestion = {
                        question : jsonData.question,
                        intro : jsonData.intro,
                        options: jsonData.options
                    }
                    resolve(jsonData)
                } else {
                    reject(new Error('Error while parsing the event source response'))
                }
            }
            eventSource.onerror = () => {
                eventSource.close()
                reject(new Error(`Error occurred during the event source.`))
            }
        })

        await firstMessagePromise
        .catch((err:Error) =>{
            throw new Error(err.message) 
        });

        
    } catch(err) {
        throw new Error('Fetching data with event source failed');
    }

    return nextQuestion
})

export const { changeGame } = gameSlice.actions;

export const selectGame = (state: RootState) => state.game; 

export default gameSlice.reducer;