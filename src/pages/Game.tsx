import { useAppDispatch, useAppSelector } from "../hooks/typedStoreHooks"

import { fetchQuestion, increaseQuestionOrder, reset5050, resetAudience, resetCorrectAnswer, resetHelplineMessages } from "../reducers/gameSlice";
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
import { QuestionContainer } from "../components/QuestionContainer";
import { Intro } from "../components/Intro";
import { Audience } from "../components/Audience";
import { GameProgress } from "../components/GameProgress";

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
    //const [disabledOptions, setDisabledOptions] = useState<Array<'A' | 'B' | 'C' | 'D'> | null>(null)

    const disabledOptions = useAppSelector((state: RootState) => state.game.eliminatedOptions5050)

    const [displayedText, setDisplayedText] = useState('');

    const [showNext, setShowNext] = useState(false);
    const [showHelpline, setShowHelpline] = useState(false);
    const [showAudience, setShowAudience] = useState(false);
    const [showIntro, setShowIntro] = useState(true);

    const audienceVotes = useAppSelector((state: RootState) => state.game.audienceVotes)

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
        // reset 
        dispatch(resetHelplineMessages())
        setShowHelpline(false)
        dispatch(reset5050())
        dispatch(resetAudience())
        dispatch(resetCorrectAnswer())

        console.log("next question")
        // reset
        setShowNext(false);
        setCorrectAnswer(null);
        setSelectedOption(null);
        setShowIntro(true);

        // increasing questionOrder triggers fetching the new question
        dispatch(increaseQuestionOrder())
    }


    useEffect(() => {
        // request next question after questionOrder update
        if (gameId && questionOrder && questionOrder > 1) {
            dispatch(fetchSSEQuestion({ gameId, questionOrder: questionOrder }))
        }
    }, [questionOrder])


    const handleHelp5050 = () => {
        dispatch(help5050())
    }

    const handleHelpAudience = () => {
        dispatch(helpAudience())
        setShowAudience(true);
    }

    const handleHelpline = () => {
        setShowHelpline(true)
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
        <div className="relative w-full">
            {questionOrder && <GameProgress currentQuestion={questionOrder} handleAudience={handleHelpAudience} handle5050={handleHelp5050} handleHelpline={handleHelpline} />}

            {audienceVotes && <Audience close={() => { dispatch(resetAudience()) }} votes={audienceVotes} />}

            {showHelpline && <Helpline close={() => { setShowHelpline(false) }} />}

            {question?.intro && <Intro show={showIntro} close={() => { setShowIntro(false) }} text={question.intro}></Intro>}

            <QuestionContainer>{question ? question.question : <Placeholder />}</QuestionContainer>

            <div className="flex gap-2 mb-4 flex-wrap justify-between align-center" >


                <Button onClick={() => { setSelectedOption('A') }}
                    disabled={disabledOptions?.includes('A')}
                    selected={selectedOption?.includes('A')}
                    correctAnswer={(correctAnswer !== null && selectedOption === 'A' && selectedOption === correctAnswer)}
                    wrongAnswer={(correctAnswer !== null && selectedOption === 'A' && selectedOption !== correctAnswer)}>
                    <div className="flex items-center justify-start">
                        <OptionSpan>A.</OptionSpan> {question ? question.options.A : <Placeholder />}
                    </div>
                </Button>
                <Button onClick={() => { setSelectedOption('B') }}
                    disabled={disabledOptions?.includes('B')}
                    selected={selectedOption?.includes('B')}
                    correctAnswer={(correctAnswer !== null && selectedOption === 'B' && selectedOption === correctAnswer)}
                    wrongAnswer={(correctAnswer !== null && selectedOption === 'B' && selectedOption !== correctAnswer)}>
                    <div className="flex items-center justify-start">
                        <OptionSpan>B.</OptionSpan> {question ? question.options.B : <Placeholder />}
                    </div>
                </Button>
                <Button onClick={() => { setSelectedOption('C') }}
                    disabled={disabledOptions?.includes('C')}
                    selected={selectedOption?.includes('C')}
                    correctAnswer={(correctAnswer !== null && selectedOption === 'C' && selectedOption === correctAnswer)}
                    wrongAnswer={(correctAnswer !== null && selectedOption === 'C' && selectedOption !== correctAnswer)}>
                    <div className="flex items-center justify-start">
                        <OptionSpan>C.</OptionSpan> {question ? question.options.C : <Placeholder />}
                    </div>
                </Button>
                <Button onClick={() => { setSelectedOption('D') }}
                    disabled={disabledOptions?.includes('D')}
                    selected={selectedOption?.includes('D')}
                    correctAnswer={(correctAnswer !== null && selectedOption === 'D' && selectedOption === correctAnswer)}
                    wrongAnswer={(correctAnswer !== null && selectedOption === 'D' && selectedOption !== correctAnswer)}>
                    <div className="flex items-center justify-start">
                        <OptionSpan>D.</OptionSpan> {question ? question.options.D : <Placeholder />}
                    </div>
                </Button>


            </div >

            <Button onClick={handleAnswer}>Answer</Button>

            {showNext && <Button onClick={handleNextQuestion}>Next Question</Button>}

            <GameNotification />

        </div>
    )
}