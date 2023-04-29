import { useAppDispatch } from "../hooks/typedStoreHooks"

import { fetchQuestion } from "../reducers/gameSlice";
import { fetchSSEQuestion } from "../reducers/fetchSSEQuestion";
import { answerQuestion } from "../reducers/answerQuestion";

import { initializeGame } from "../reducers/initializeGame";

export default function Game() {

    // game id state
    const dispatch = useAppDispatch();

    // current question state

    return (
        <>
            <div>Intro Message</div>

            <div>Question</div>
            <div>
                <button onClick={() => { dispatch(fetchSSEQuestion({ gameId: 30, questionOrder: 1 })) }}>A</button>
                <button onClick={() => { dispatch(answerQuestion({ gameId: 30, questionOrder: 1, answer: 'D' })) }}>B</button>
                <button onClick={() => { dispatch(fetchQuestion({ gameId: 30, questionOrder: 1 })) }}> C</button >
                <button onClick={() => { dispatch(initializeGame()) }}>D</button>
            </div >

            <button>Next</button>
        </>
    )
}