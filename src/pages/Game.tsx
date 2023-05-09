import { useAppDispatch, useAppSelector } from "../hooks/typedStoreHooks"

import { fetchQuestion } from "../reducers/gameSlice";
import { fetchSSEQuestion } from "../reducers/fetchSSEQuestion";
import { answerQuestion } from "../reducers/answerQuestion";

import { initializeGame } from "../reducers/initializeGame";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../store/store";
import { GameNotification } from "../components/GameNotification";

export default function Game() {

    // game id state
    const dispatch = useAppDispatch();

    const gameId = useAppSelector((state: RootState) => state.game.gameId);
    const questionOrder = useAppSelector((state: RootState) => state.game.questionOrder);
    const question = useAppSelector((state: RootState) => state.game.currentQuestion);
    const error = useAppSelector((state: RootState) => state.game.error);

    const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null)
    const [correctAnswer, setCorrectAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null)

    const [showNext, setShowNext] = useState(false);

    const firstRequestSent = useRef(false);

    const handleAnswer = () => {
        if (selectedOption && gameId && questionOrder) {
            dispatch(answerQuestion({ gameId, questionOrder, answer: selectedOption }))
                .unwrap()
                .then((res) => {
                    setCorrectAnswer(res.correctAnswer)

                    if (res.correctlyAnswered) {
                        // modify answer button to next question button
                        setShowNext(true)
                    } else {
                        console.log("game over")
                    }
                })
        }
    }

    const handleNextQuestion = () => {
        console.log("next question")
        // reset
        setShowNext(false);
        setCorrectAnswer(null);
        setSelectedOption(null);

        // question order already increased with successful answer
        if (gameId && questionOrder) {
            dispatch(fetchSSEQuestion({ gameId, questionOrder }))
        }
    }

    useEffect(() => {
        if (!gameId || !questionOrder) {
            // initialize gameId or questionOrder
            if (gameId) {
                dispatch(initializeGame({ gameId }))
            } else {
                dispatch(initializeGame())
            }
        } else {
            // initialize question for given gameId and order
            if (!firstRequestSent.current) {
                firstRequestSent.current = true;
                dispatch(fetchSSEQuestion({ gameId, questionOrder }))

            }
        }
    }, [gameId])

    return (
        <>
            <div>{question?.intro}</div>

            <div>{question?.question}</div>
            <div>
                <button onClick={() => { setSelectedOption('A') }}>A. {question?.options.A}</button>
                <button onClick={() => { setSelectedOption('B') }}>B. {question?.options.B}</button>
                <button onClick={() => { setSelectedOption('C') }}>C. {question?.options.C}</button>
                <button onClick={() => { setSelectedOption('D') }}>D. {question?.options.D}</button>
            </div >

            <button onClick={handleAnswer}>Answer</button>

            {showNext && <button onClick={handleNextQuestion}>Next Question</button>}

            <GameNotification />

        </>
    )
}