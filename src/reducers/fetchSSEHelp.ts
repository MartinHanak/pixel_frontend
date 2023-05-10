import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const fetchSSEHelp = createAsyncThunk<any, {selectedCharacter: string, playerMessage: string}, {state: RootState}>('game/helpSSE', async (arg, thunkAPI) => {

    const jwt = thunkAPI.getState().login.jwt;

    const gameId = thunkAPI.getState().game.gameId;

})