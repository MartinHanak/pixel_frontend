import { CharacterIcon } from "./CharacterIcon";
import { character, message } from "./Helpline";
import TextInput from "./TextInput";
import { useState } from "react";
import { fetchHelpline } from "../reducers/fetchHelpline";
import { useAppDispatch } from "../hooks/typedStoreHooks";
import { addHelplineMessage } from "../reducers/gameSlice";
import { Messages } from "./Messages";

interface CharacterDetails {
    selectedCharacter: character,
    cancelSelection: () => void,
    oldMessages: message[] | null
}

export function CharacterDetails({ selectedCharacter, cancelSelection, oldMessages }: CharacterDetails) {

    const dispatch = useAppDispatch()

    const [playerMessage, setPlayerMessage] = useState<string>('')

    const handleHelplineRequest = () => {
        if (playerMessage !== '') {
            setPlayerMessage('')
        }

        if (playerMessage && playerMessage !== '') {
            dispatch(addHelplineMessage({ role: "user", content: playerMessage }))
        }

        dispatch(fetchHelpline({ selectedCharacter: selectedCharacter, playerMessage: playerMessage }))
    }

    return (
        <div>
            <button onClick={cancelSelection}>Back to Selection</button>
            <h3>{selectedCharacter.name}</h3>
            <CharacterIcon imageSrc={selectedCharacter.imageSrc} />
            <p>{selectedCharacter.description}</p>

            {oldMessages === null ? <div>
                <p>No Messages Yet</p>
                <p>Do you want to call this person?</p>
                <button onClick={handleHelplineRequest}>Call</button>
            </div>
                : <Messages />}

            <TextInput name="playerMessage" id="playerMessage" type="text" value={playerMessage} onChange={(e) => setPlayerMessage(e.target.value)} />
            <button onClick={handleHelplineRequest}>Send</button>


        </div>
    )
}