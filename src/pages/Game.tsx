import { useAppDispatch } from "../hooks/typedStoreHooks"

import { fetchQuestion } from "../reducers/gameSlice";
import { fetchSSEQuestion } from "../reducers/fetchSSEQuestion";
import { answerQuestion } from "../reducers/answerQuestion";

export default function Game() {

    // game id state
    const dispatch = useAppDispatch();

    // current question state

    return (
        <>
            <div>Intro Message</div>

            <div>Question</div>
            <div>
                <button onClick={() => { dispatch(fetchSSEQuestion({ gameId: 26, questionOrder: 6 })) }}>A</button>
                <button onClick={() => { dispatch(answerQuestion({ gameId: 26, questionOrder: 6, answer: 'D' })) }}>B</button>
                <button onClick={() => { dispatch(fetchQuestion({ gameId: 26, questionOrder: 6 })) }}> C</button >
                <button>D</button>
            </div >
        </>
    )
}