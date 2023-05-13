import { useAppDispatch, useAppSelector } from "../hooks/typedStoreHooks"

import { fetchQuestion, resetHelplineMessages } from "../reducers/gameSlice";
import { fetchSSEQuestion } from "../reducers/fetchSSEQuestion";
import { answerQuestion } from "../reducers/answerQuestion";

import { initializeGame } from "../reducers/initializeGame";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../store/store";
import { GameNotification } from "../components/GameNotification";
import { help5050 } from "../reducers/help5050";
import { helpAudience } from "../reducers/helpAudience";
import { Helpline } from "../components/Helpline";
import { Placeholder } from "../components/Placeholder";
import { Button } from "../components/Button";
import { OptionSpan } from "../components/OptionSpan";

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
                        // modify answer Button to next question Button
                        setShowNext(true)
                    } else {
                        console.log("game over")
                    }
                })
        }
    }

    const handleNextQuestion = () => {
        // reset helpline
        dispatch(resetHelplineMessages())
        setShowHelpline(false)

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
                <Button onClick={handleHelpAudience}>Audience</Button>
                <Button onClick={handleHelp5050}>50:50</Button>
                <Button onClick={() => setShowHelpline(true)}>Helpline</Button>
            </div>

            {showHelpline && <Helpline />}

            <div>{question?.intro}</div>

            <div>{question ? question.question : <Placeholder />}</div>

            <div>
                {question ?
                    <>
                        <Button onClick={() => { setSelectedOption('A') }}>
                            <OptionSpan>A.</OptionSpan> {question?.options.A}
                        </Button>
                        <Button onClick={() => { setSelectedOption('B') }}>
                            <OptionSpan>B.</OptionSpan> {question?.options.B}
                        </Button>
                        <Button onClick={() => { setSelectedOption('C') }}>
                            <OptionSpan>C.</OptionSpan> {question?.options.C}
                        </Button>
                        <Button onClick={() => { setSelectedOption('D') }}>
                            <OptionSpan>D.</OptionSpan> {question?.options.D}
                        </Button>
                    </>
                    :
                    <>
                        <Button onClick={() => { setSelectedOption('A') }}>
                            <OptionSpan>A.</OptionSpan> <Placeholder />
                        </Button>
                        <Button onClick={() => { setSelectedOption('B') }}>
                            <OptionSpan>B.</OptionSpan> <Placeholder />
                        </Button>
                        <Button onClick={() => { setSelectedOption('C') }}>
                            <OptionSpan>C.</OptionSpan> <Placeholder />
                        </Button>
                        <Button onClick={() => { setSelectedOption('D') }}>
                            <OptionSpan>D.</OptionSpan> <Placeholder />
                        </Button>
                    </>
                }
            </div >

            <Button onClick={handleAnswer}>Answer</Button>

            {showNext && <Button onClick={handleNextQuestion}>Next Question</Button>}

            <GameNotification />

        </>
    )
}