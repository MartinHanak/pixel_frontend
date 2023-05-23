import { Modal } from "./Modal";
import { resetGameState } from "../reducers/gameSlice";
import { useAppDispatch, useAppSelector } from "../hooks/typedStoreHooks";
import { useNavigate } from "react-router-dom";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { RootState } from "../store/store";


type NotificationTypes = 'win' | 'gameover' | 'error';

export function GameNotification() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const error = useAppSelector((state: RootState) => state.game.error);
    const gameover = useAppSelector((state: RootState) => state.game.gameover);
    const win = useAppSelector((state: RootState) => state.game.win);

    const question = useAppSelector((state: RootState) => state.game.currentQuestion)

    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState<NotificationTypes | null>(null);

    const [displayText, setDisplayText] = useState('');

    const handleCloseModal = () => {
        // hard reset if question failed to generate
        if (question === null || gameover || win) {
            // reset game state
            dispatch(resetGameState())
            // redirect
            navigate('/')
        } else {
            setShowModal(false)
        }
    }

    useEffect(() => {
        if (win) {
            setShowModal(true)
            setDisplayText("Congrats! You won.");
        } else if (gameover) {
            setShowModal(true)
            setDisplayText("Game Over");
        } else if (error) {
            setShowModal(true)
            setDisplayText(error.message ? error.message : "Error occurred while generating the next question. Try generating a game with a less specific theme.");
        }

    }, [error, gameover, win])

    return (
        <Modal showModal={showModal} onCloseModal={handleCloseModal} hideButtonText="Back to main page" >
            <div>{displayText}</div>
        </Modal>
    )
}