import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import fetchWithCredentials from "../utils/fetchWithCredentials";
import { BACKEND_URL } from "../utils/config";

export type answerType = "A" | "B" | "C" | "D";

export const help5050 = createAsyncThunk<{options: answerType[] },undefined ,{state: RootState}>('game/help5050', async (arg, thunkAPI) => {

    const jwt = thunkAPI.getState().login.jwt;

    const gameId = thunkAPI.getState().game.gameId;
    const questionOrder = thunkAPI.getState().game.questionOrder;

    try {
        const response = await fetchWithCredentials(`${BACKEND_URL}/api/game/help5050/${gameId}/${questionOrder}`, jwt);

        if(!response.ok) {
            throw new Error('Help5050 response is not ok')
        } else {
            const jsonData = await response.json()

            if(!jsonData.options[0] || !jsonData.options[1]) {
                throw new Error('Could not extract 5050 options')
            } else {
                return {
                    options: [...jsonData.options]
                }
            }
        }
    } catch{
        throw new Error('Error while fetching help 50:50')
    }

})