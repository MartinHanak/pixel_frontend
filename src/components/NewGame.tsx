import { RootState } from "../store/store";
import { useState } from "react"
import { Modal } from "./Modal"
import TextInput from "../components/TextInput"
import { useAppDispatch, useAppSelector } from "../hooks/typedStoreHooks";

import { createGame } from "../reducers/createGame";
import { useNavigate } from "react-router-dom";
import { resetGameState } from "../reducers/gameSlice";
import { StartButton } from "./StartButton";
import { Loading } from "./Loading";
import { Button } from "./Button";
import { QuestionContainer } from "./QuestionContainer";

interface NewGame {
    showLogin: () => void
}

export function NewGame({ showLogin }: NewGame) {

    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const username = useAppSelector((state: RootState) => state.login.username)
    const status = useAppSelector((state: RootState) => state.game.status);

    const [showModal, setShowModal] = useState(false);
    const [theme, setTheme] = useState('');

    const handleStartingNewGame = () => {

        // check if logged in
        if (username && username !== '') {
            // reset old game 
            dispatch(resetGameState())

            // if yes, create new game and redirect
            dispatch(createGame({ theme: theme }))
                .unwrap()
                .then(() => {
                    navigate("/game");
                })
        } else {
            showLogin()
        }
    }

    return (
        <div className="flex flex-col justify-start gap-0 items-stretch p-0">

            <div className="bg-black bg-opacity-40 p-4 rounded-t-lg">
                <h1 className="font-bold text-white  text-4xl md:text-5xl lg:text-6xl italic">
                    <span>Who Wants to Be a</span>
                    <span className="text-yellow-500">&nbsp;Millionaire</span>
                </h1>

                <h2 className="text-white text-lg italic mt-4">
                    AI generated quesitions
                </h2>
            </div>

            <div className="p-4 bg-black bg-opacity-50 rounded-b-lg">
                <div className="bg-white w-3/3 md:w-2/3 px-8 py-4 ml-8 rounded-lg">
                    <div className="flex flex-col gap-0 items-start justify-between">
                        <label className="text-gray-500" htmlFor="theme">Theme (Optional)</label>
                        <input className="bg-gray-300 font-bold px-2 w-2/3 mb-4 rounded-lg border-b-2 border-solid border-black" type="text" name="theme" id="theme" value={theme} onChange={(e) => setTheme(e.target.value)} />
                        <StartButton onClick={handleStartingNewGame}>START GAME</StartButton>
                    </div>
                </div>
            </div>
        </div>
    )
}