import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { BACKEND_URL } from "../utils/config";
import fetchWithCredentials from "../utils/fetchWithCredentials";


type answer = 'A' | 'B' | 'C' | 'D'

interface answerResponse {
    correctlyAnswered: boolean ,
    correctAnswer: answer
}


export const answerQuestion = createAsyncThunk<answerResponse , {gameId: number, questionOrder: number, answer: answer}, {state:RootState}>('game/answer', async (arg, thunkAPI) => {
    const jwt = thunkAPI.getState().login.jwt;

    try {
        const response =  await fetchWithCredentials(
            `${BACKEND_URL}/api/game/answer/${arg.gameId}/${arg.questionOrder}`, 
            jwt, 
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({answer: arg.answer})
            })
        if(!response.ok) {
            throw new Error(response.statusText)
        } else {
            const jsonData = await response.json();

            if(!(jsonData.correctAnswer && 'correctlyAnswered' in jsonData)) {
                throw new Error('Could not extract answer from the backend response.')
            } else {
                return {
                    correctAnswer: jsonData.correctAnswer,
                    correctlyAnswered: jsonData.correctlyAnswered
                }
            }

        }
    } catch(err) {
        console.log(err)
        throw new Error('Errror while answering the game question');
    }
})