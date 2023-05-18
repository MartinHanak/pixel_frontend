import { RootState } from "../store/store";
import { useState } from "react"
import { Modal } from "./Modal"
import TextInput from "../components/TextInput"
import { useAppDispatch, useAppSelector } from "../hooks/typedStoreHooks";

import { createGame } from "../reducers/createGame";
import { useNavigate } from "react-router-dom";
import { resetGameState } from "../reducers/gameSlice";
import { Loading } from "./Loading";
import { Button } from "./Button";
import { QuestionContainer } from "./QuestionContainer";

export function NewGame() {

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
            setShowModal(true)
        }
    }

    return (
        <div>
            {status === 'pending' ? <Loading /> :
                <>
                    <h2>New game</h2>
                    <div>
                        <label htmlFor="theme">Theme (optional)</label>
                        <TextInput name="theme" id="theme" type="text" onChange={(e) => setTheme(e.target.value)} value={theme} />
                    </div>
                    <Button onClick={handleStartingNewGame}>Start new game</Button>

                    <button onClick={() => setShowModal((previousValue) => !previousValue)}>Show Modal</button>

                    <Button onClick={() => { console.log("click") }}>
                        <p>Testing</p>
                        <p>another line</p>
                        <p>another</p>
                    </Button>

                    <QuestionContainer> Hello</QuestionContainer>

                    <Modal showModal={showModal} onCloseModal={() => setShowModal((previousValue) => !previousValue)}>
                        <div>Hello world</div>
                    </Modal>
                </>
            }
        </div>
    )
}