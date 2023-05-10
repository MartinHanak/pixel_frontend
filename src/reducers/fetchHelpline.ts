import { RootState } from "../store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchWithCredentials from "../utils/fetchWithCredentials";
import { BACKEND_URL } from "../utils/config";
import { character, message } from "../components/Helpline";



interface HelplineDispatchArg {
    selectedCharacter : character,
    playerMessage?: string
}

interface HelplineRequestBody {
    selectedCharacter: string,
    playerMessage?: string
}

export const fetchHelpline = createAsyncThunk<message,HelplineDispatchArg,{state:RootState}>('game/fetchHelpline', async (arg, thunkAPI) => {

    const jwt = thunkAPI.getState().login.jwt;

    const gameId = thunkAPI.getState().game.gameId;
    const questionOrder = thunkAPI.getState().game.questionOrder;

    let requestBody : HelplineRequestBody = {
        selectedCharacter: arg.selectedCharacter.name,
    }

    if(arg.playerMessage && arg.playerMessage !== '') {
        requestBody = {...requestBody, playerMessage: arg.playerMessage}
    }

    try {

        const response = await fetchWithCredentials(`${BACKEND_URL}/api/game/helpline/${gameId}/${questionOrder}`, jwt, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });


        if (!response.ok) {
            throw new Error('Helpline response is not ok')
        } else {
            const jsonData = await response.json();

            if(!jsonData.role || !jsonData.content) {
                throw new Error('Helpline response is not in the correct format.')
            } else {
                return {
                    role: jsonData.role,
                    content: jsonData.content
                }
            }
        }

    } catch(err) {
        console.log(err)
        throw new Error(`Error while fetching helpline.`)
    }

})