import { useAppDispatch } from "../hooks/typedStoreHooks"

import { fetchQuestion } from "../reducers/gameSlice";

export default function Game() {

    // game id state
    const dispatch = useAppDispatch();

    // current question state

    return (
        <>
            <div>Intro Message</div>

            <div>Question</div>
            <div>
                <button>A</button>
                <button>B</button>
                <button onClick={() => { dispatch(fetchQuestion()) }}> C</button >
                <button>D</button>
            </div >
        </>
    )
}