import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import fetchWithCredentials from "../utils/fetchWithCredentials";
import { BACKEND_URL } from "../utils/config";
import { json } from "stream/consumers";

enum answerOptions {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D'
}

export const helpAudience = createAsyncThunk<{votes: {[key in answerOptions] : number} }, undefined ,{state: RootState}>('game/helpAudience', async (arg, thunkAPI) => {

    const jwt = thunkAPI.getState().login.jwt;

    const gameId = thunkAPI.getState().game.gameId;
    const questionOrder = thunkAPI.getState().game.questionOrder;

    try {
        const response = await fetchWithCredentials(`${BACKEND_URL}/api/game/helpaudience/${gameId}/${questionOrder}`, jwt);

        if(!response.ok) {
            throw new Error('HelpAudience response is not ok')
        } else {
            const jsonData = await response.json()

            if(!jsonData.votes) {
                throw new Error('Could not extract Audience help votes')
            } else {
                return {
                    votes: {...jsonData.votes}
                }
            }
        }
    } catch{
        throw new Error('Error while fetching audience help')
    }

})