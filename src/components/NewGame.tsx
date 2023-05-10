import { RootState } from "../store/store";
import { useState } from "react"
import { Modal } from "./Modal"
import TextInput from "../components/TextInput"
import { useAppDispatch, useAppSelector } from "../hooks/typedStoreHooks";

import { createGame } from "../reducers/createGame";
import { useNavigate } from "react-router-dom";
import { resetGameState } from "../reducers/gameSlice";

export function NewGame() {

    const navigate = useNavigate()

    const dispatch = useAppDispatch();
    const username = useAppSelector((state: RootState) => state.login.username)

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
            setShowModal(true)
        }
    }

    return (
        <div>
            <h2>New game</h2>
            <div>
                <label htmlFor="theme">Theme (optional)</label>
                <TextInput name="theme" id="theme" type="text" onChange={(e) => setTheme(e.target.value)} value={theme} />
            </div>
            <button onClick={handleStartingNewGame}>Start new game</button>

            <button onClick={() => setShowModal((previousValue) => !previousValue)}>Show Modal</button>

            <Modal showModal={showModal} onCloseModal={() => setShowModal((previousValue) => !previousValue)}>
                <div>Hello world</div>
            </Modal>
        </div>
    )
}