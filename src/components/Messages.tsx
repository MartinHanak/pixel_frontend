import { useAppSelector } from "../hooks/typedStoreHooks"
import { RootState } from "../store/store"
import { character, message } from "./Helpline";
import { CharacterIcon } from "./CharacterIcon";
import { Message } from "./Message";

import userIcon from '../assets/images/user_3.svg'

interface Messages {
    character: character
}

export function Messages({ character }: Messages) {

    const oldMessages = useAppSelector((state: RootState) => state.game.oldHelplineMessages);

    return (
        <>
            {oldMessages ?
                <div>
                    {oldMessages.map((message: message, index: number) => {
                        if (message.role === 'assistant') {
                            return (<div key={index} className="flex">

                                <CharacterIcon imageSrc={character.imageSrc} small />
                                <Message >{message.content}</Message>

                            </div>)
                        } else if (message.role === 'user') {
                            return (<div key={index} className="flex">

                                <Message user={true}>{message.content}</Message>
                                <CharacterIcon imageSrc={userIcon} small />

                            </div>)
                        }
                    })}
                </div>
                : <div>No messages yet.</div>}

        </>
    )
}