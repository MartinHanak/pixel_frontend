import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { BACKEND_URL } from '../utils/config'
import fetchWithCredentials from '../utils/fetchWithCredentials'
import { fetchSSEQuestion } from './fetchSSEQuestion'
import { answerQuestion } from './answerQuestion'
import { initializeGame } from './initializeGame'
import { createGame } from './createGame'
import { help5050 } from './help5050'
import { helpAudience } from './helpAudience'
import { fetchHelpline } from './fetchHelpline'
import { message } from '../components/Helpline'
import { act } from 'react-dom/test-utils'
import { answerType } from './help5050'

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
    numberOfQuestions: number | null,
    questionOrder : number | null,
    currentQuestion: question | null,
    correctAnswer: answerType | null,
    error: SerializedError | null,
    status: string | null,
    gameover: boolean,
    win: boolean,
    oldHelplineMessages: message[] | null,
    eliminatedOptions5050: answerType[] | null,
    audienceVotes: {[key: string]: number} | null,
    usedAudience: boolean,
    used5050: boolean,
    usedHelpline: boolean
}

const initialState : gameState  = {
    gameId: null,
    questionOrder: null,
    numberOfQuestions: null,
    currentQuestion: null,
    correctAnswer: null,
    status: 'idle',
    error: null,
    gameover: false,
    win: false,
    oldHelplineMessages: null,
    eliminatedOptions5050: null,
    audienceVotes: null,
    used5050: false,
    usedAudience: false,
    usedHelpline: false
}


export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        changeGame: (state, action: PayloadAction<number>) => {
            state.gameId = action.payload;
        },
        increaseQuestionOrder: (state) => {
            if(state.questionOrder) {
                state.questionOrder = state.questionOrder + 1
            } else {
                state.questionOrder = 1
            }
        },
        resetGameState: () => {
           return {...initialState};
        },
        addHelplineMessage: (state, action: PayloadAction<message>) => {
            if(state.oldHelplineMessages) {
                state.oldHelplineMessages = [...state.oldHelplineMessages, action.payload]
            } else {
                state.oldHelplineMessages = [action.payload]
            }
        },
        resetHelplineMessages: (state) => {
            state.oldHelplineMessages = null;
        },
        reset5050: (state) => {
            state.eliminatedOptions5050 = null
        },
        resetAudience: (state) => {
            state.audienceVotes = null
        },
        resetCorrectAnswer: (state) => {
            state.correctAnswer = null
        }
    },
    extraReducers:  (builder) => {
        builder 
            .addCase(createGame.fulfilled, (state, action) => {
                state.gameId = action.payload.gameId;
                state.questionOrder = 1;
                state.numberOfQuestions = 15;
                state.status = 'idle';
            })
            .addCase(createGame.rejected, (state, action) => {
                console.log(action.error)
                state.error = action.error
            })

            .addCase(createGame.pending, (state, action) => {
                state.status= 'pending';
            })

            .addCase(initializeGame.fulfilled, (state, action) => {
                console.log(action.payload)
                state.gameId = action.payload.gameId;
                state.questionOrder = action.payload.questionOrder;
                state.numberOfQuestions = action.payload.numberOfQuestions;
            })
            .addCase(initializeGame.rejected, (state, action) => {
                console.log(action.error)
                state.error = action.error
            })

            .addCase(fetchSSEQuestion.pending, (state, action) => {
                state.currentQuestion = null;
                
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
                state.correctAnswer = action.payload.correctAnswer;
                if(action.payload.correctlyAnswered) {
                    // increased by a separate action
                    if(state.questionOrder === 15) {
                        state.win = true;
                    }
                } else {
                    state.gameover = true;
                }
            })

            .addCase(answerQuestion.rejected, (state, action) => {
                console.log(action.error)
                state.error = action.error
            })

            .addCase(help5050.rejected, (state, action) =>{
                console.log(action.error)
                state.error = action.error
            } )
            .addCase(help5050.fulfilled, (state, action) => {
                state.used5050 = true;

                const options = ['A', 'B', 'C', 'D'] as answerType[];
                const eliminatedOptions = [] as answerType[];

                for(const option of options) {
                    if(!action.payload.options.includes(option)) {
                        eliminatedOptions.push(option)
                    }
                }
                
                state.eliminatedOptions5050 = eliminatedOptions;
            }) 

            .addCase(helpAudience.rejected , (state, action) => {
                console.log(action.error)
                state.error = action.error
            })
            .addCase(helpAudience.fulfilled, (state,action) => {
                state.usedAudience = true;
                state.audienceVotes = action.payload.votes
                console.log(action.payload.votes)
            })

            .addCase(fetchHelpline.pending, (state,action) => {
                state.status= "pending";
            })
            .addCase(fetchHelpline.rejected, (state, action) => {
                state.status = "idle";
                console.log(action.error)
                state.error = action.error
            })
            .addCase(fetchHelpline.fulfilled, (state, action) => {
                state.usedHelpline = true;
                state.status = "idle";
                console.log(action.payload.content)
                if(state.oldHelplineMessages) {
                    state.oldHelplineMessages = [...state.oldHelplineMessages, action.payload]
                } else {
                    state.oldHelplineMessages = [action.payload]
                }
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


export const { changeGame, resetGameState, addHelplineMessage, resetHelplineMessages, reset5050, resetAudience, increaseQuestionOrder, resetCorrectAnswer } = gameSlice.actions;

export const selectGame = (state: RootState) => state.game; 

export default gameSlice.reducer;