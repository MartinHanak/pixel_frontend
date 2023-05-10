import { useAppSelector } from "../hooks/typedStoreHooks"
import { RootState } from "../store/store"
import { message } from "./Helpline";

export function Messages() {

    const oldMessages = useAppSelector((state: RootState) => state.game.oldHelplineMessages);


    return (
        <>
            {oldMessages ?
                <div>
                    {oldMessages.map((message: message, index: number) => {
                        if (message.role === 'assistant') {
                            return (<div key={index}>Assistant: {message.content}</div>)
                        } else if (message.role === 'user') {
                            return (<div key={index}>User: {message.content}</div>)
                        }
                    })}
                </div>
                : <div>No messages yet.</div>}

        </>
    )
}