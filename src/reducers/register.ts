import { createAsyncThunk } from "@reduxjs/toolkit"
import { BACKEND_URL } from "../utils/config"
import { RootState } from "../store/store"

export const register = createAsyncThunk<{username: string, jwt: string}, {inputUsername: string, inputPassword: string}, {state: RootState}>('login/register', async (arg, thunkAPI) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/users`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                username: arg.inputUsername, 
                password: arg.inputPassword
            })
        })

        if(response.ok) {
            const jsonData = await response.json();

            localStorage.setItem("username", jsonData.username);
            localStorage.setItem("jwt", jsonData.token);

            if (!(jsonData.username && jsonData.token)) {
                throw new Error('Backend response could not be parsed.')
            }

            return {
                username: jsonData.username,
                jwt: jsonData.token
            }

        } else {
            const jsonData = await response.json();

            throw new Error(jsonData.error? jsonData.error : 'Error while logging in.')
        }


    } catch(err) {
        let message = 'Unknown Error';
        if (err instanceof Error) message = err.message
        throw new Error(message)
    }
})



