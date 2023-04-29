import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../store/store";
import fetchWithCredentials from "../utils/fetchWithCredentials";
import { BACKEND_URL } from "../utils/config";

export  const initializeGame  = createAsyncThunk<{gameId: number, questionOrder: number}, {gameId: number } | undefined, {state:RootState}>('game/initialize', async (arg, thunkAPI) => {

    const jwt = thunkAPI.getState().login.jwt;

    // fetch last unanswered question for the specified user
    // returns only gameId and questionOrder
    // SSE fetch for the actual question is fetched from components

    try {
        let backendURL = ''

        if(arg && arg.gameId && !isNaN(Number(arg.gameId))) {
            backendURL = `${BACKEND_URL}/api/game/${Number(arg.gameId)}/last`
        } else {
            backendURL = `${BACKEND_URL}/api/game/last`
        }

        const response = await fetchWithCredentials(backendURL, jwt)

        if(!response.ok) {
            throw new Error(`Response while initializing the game is not ok.`)
        }

        const jsonData = await response.json();
 
        if(!(jsonData.gameId && jsonData.questionOrder) || 
            isNaN(Number(jsonData.gameId))  || 
            isNaN(Number(jsonData.questionOrder))) {

            throw new Error(`Response could not be parsed while initializing the game.`)
        }

        return {
            gameId: Number(jsonData.gameId),
            questionOrder: Number(jsonData.questionOrder)
        }

    } catch(err) {
        console.log(err)
        throw new Error('Error while initializing the game.')
    }

})


