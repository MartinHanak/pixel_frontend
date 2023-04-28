import { createAsyncThunk } from "@reduxjs/toolkit";
import {  EventSourcePolyfill } from 'event-source-polyfill';
import type { question } from "./gameSlice";
import type { RootState } from '../store/store'

import { BACKEND_URL } from '../utils/config'
import fetchWithCredentials from "../utils/fetchWithCredentials";
import { formatWithOptions } from "util";


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

        // request creation of the next question now, but do not await
        fetchWithCredentials(
            `${BACKEND_URL}/api/game/${arg.gameId}/${arg.questionOrder + 1}`, 
            jwt, 
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
        
    } catch(err) {
        throw new Error('Fetching data with event source failed');
    }

    return nextQuestion
})