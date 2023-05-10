import { useAppDispatch, useAppSelector } from "../hooks/typedStoreHooks"

import { fetchQuestion } from "../reducers/gameSlice";
import { fetchSSEQuestion } from "../reducers/fetchSSEQuestion";
import { answerQuestion } from "../reducers/answerQuestion";

import { initializeGame } from "../reducers/initializeGame";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../store/store";
import { GameNotification } from "../components/GameNotification";
import { help5050 } from "../reducers/help5050";
import { helpAudience } from "../reducers/helpAudience";
import { Helpline } from "../components/Helpline";

export default function Game() {

    // game id state
    const dispatch = useAppDispatch();

    const gameId = useAppSelector((state: RootState) => state.game.gameId);
    const questionOrder = useAppSelector((state: RootState) => state.game.questionOrder);
    const question = useAppSelector((state: RootState) => state.game.currentQuestion);
    const error = useAppSelector((state: RootState) => state.game.error);
    const numberOfQuestions = useAppSelector((state: RootState) => state.game.numberOfQuestions);

    const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null)
    const [correctAnswer, setCorrectAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null)

    const [showNext, setShowNext] = useState(false);
    const [showHelpline, setShowHelpline] = useState(false);

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

    const handleHelp5050 = () => {
        dispatch(help5050())
    }

    const handleHelpAudience = () => {
        dispatch(helpAudience())
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
            <div>Question {questionOrder}/{numberOfQuestions}</div>

            <div>
                <button onClick={handleHelpAudience}>Audience</button>
                <button onClick={handleHelp5050}>50:50</button>
                <button onClick={() => setShowHelpline(true)}>Helpline</button>
            </div>

            {showHelpline && <Helpline />}

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