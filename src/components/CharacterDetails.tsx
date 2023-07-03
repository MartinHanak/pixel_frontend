import { CharacterIcon } from "./CharacterIcon";
import { character, message } from "./Helpline";
import TextInput from "./TextInput";
import { useState, useRef, useEffect, KeyboardEventHandler, KeyboardEvent } from "react";
import { fetchHelpline } from "../reducers/fetchHelpline";
import { useAppDispatch, useAppSelector } from "../hooks/typedStoreHooks";
import { addHelplineMessage } from "../reducers/gameSlice";
import { Messages } from "./Messages";
import { Button } from "./Button";
import { RootState } from "../store/store";
import { Message } from "./Message";
import { Placeholder } from "./Placeholder";

interface CharacterDetails {
    selectedCharacter: character,
    cancelSelection: () => void,
    oldMessages: message[] | null
}

export function CharacterDetails({ selectedCharacter, cancelSelection, oldMessages }: CharacterDetails) {

    const status = useAppSelector((state: RootState) => state.game.status)

    const dispatch = useAppDispatch()

    const messagesContainerEnd = useRef<HTMLDivElement>(null);
    const messageTextarea = useRef<HTMLTextAreaElement>(null)

    const [playerMessage, setPlayerMessage] = useState<string>('')

    const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.target) {
            const textarea = e.target as HTMLTextAreaElement;
            textarea.style.height = 'inherit';

            const computed = window.getComputedStyle(textarea);

            const height = textarea.scrollHeight;

            textarea.style.height = `${height}px`;
        }
    }


    const handleHelplineRequest = () => {
        // rest message
        if (playerMessage !== '') {
            setPlayerMessage('')
        }
        // reset height
        const textArea = messageTextarea.current as HTMLTextAreaElement
        textArea.style.height = 'inherit';

        // send new message
        if (playerMessage && playerMessage !== '') {
            dispatch(addHelplineMessage({ role: "user", content: playerMessage }))
        }

        dispatch(fetchHelpline({ selectedCharacter: selectedCharacter, playerMessage: playerMessage }))
    }

    const scrollToBottom = () => {
        messagesContainerEnd.current?.scrollIntoView({ behavior: "smooth", block: 'nearest' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [status])

    return (
        <div className="pt-4 h-full ">

            <div style={{ maxHeight: 'calc(100% - 8rem)' }} className="overflow-y-auto overflow-x-hidden h-full">
                {oldMessages !== null ? <Messages character={selectedCharacter} />
                    : null}

                {status === "pending" ? <div className="flex">

                    <CharacterIcon imageSrc={selectedCharacter.imageSrc} small />
                    <Message><Placeholder /></Message>

                </div> : null}

                <div ref={messagesContainerEnd} />
            </div>

            <div className="border-solid border-t-2 border-gray-300 pt-2">

                <div className=" flex items-end justify-center gap-0 h-14">
                    <textarea name="playerMessage" id="playerMessage"
                        className="w-full h-full px-4 pt-4 pb-4 m-0 z-50 outline-none bg-gray-200"
                        ref={messageTextarea}
                        value={playerMessage}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setPlayerMessage(e.target.value)} />

                    <button className="bg-green-500 p-4 text-white font-bold hover:bg-green-700" onClick={handleHelplineRequest}>Send</button>
                </div>
            </div>

        </div>
    )
}