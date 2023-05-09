import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import fetchWithCredentials from "../utils/fetchWithCredentials";
import { BACKEND_URL } from "../utils/config";

export const createGame = createAsyncThunk<{gameId: number}, {theme: string}, {state: RootState}>('game/create', async (arg, thunkAPI) => {

    const jwt = thunkAPI.getState().login.jwt;

    try {
        const response = await fetchWithCredentials(`${BACKEND_URL}/api/game`, jwt, {
        
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({theme: arg.theme})
        
        })

        if(!response.ok) {
            throw new Error(`Response while creating a new game is not ok.`) 
        } else {
            const jsonData = await response.json()

            if(!jsonData.gameId) {
                throw new Error(`Could not parse response while creating a new game.`)
            } else {
                return {
                    gameId: jsonData.gameId
                }
            }
        }



    
    } catch {
        throw new Error(`Error while creating a new game with theme: ${arg.theme}`)
    }
})