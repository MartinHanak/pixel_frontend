import { useAppDispatch } from "../hooks/typedStoreHooks"

import { fetchQuestion, fetchSSEQuestion } from "../reducers/gameSlice";

export default function Game() {

    // game id state
    const dispatch = useAppDispatch();

    // current question state

    return (
        <>
            <div>Intro Message</div>

            <div>Question</div>
            <div>
                <button onClick={() => { dispatch(fetchSSEQuestion({ gameId: 26, questionOrder: 1 })) }}>A</button>
                <button>B</button>
                <button onClick={() => { dispatch(fetchQuestion({ gameId: 26, questionOrder: 1 })) }}> C</button >
                <button>D</button>
            </div >
        </>
    )
}