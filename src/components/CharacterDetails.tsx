import { CharacterIcon } from "./CharacterIcon";
import { character, message } from "./Helpline";
import TextInput from "./TextInput";
import { useState } from "react";

interface CharacterDetails {
    selectedCharacter: character,
    cancelSelection: () => void,
    oldMessages: message[] | null
}

export function CharacterDetails({ selectedCharacter, cancelSelection, oldMessages }: CharacterDetails) {

    const [playerMessage, setPlayerMessage] = useState<string>('')

    return (
        <div>
            <button onClick={cancelSelection}>Back to Selection</button>
            <h3>{selectedCharacter.name}</h3>
            <CharacterIcon imageSrc={selectedCharacter.imageSrc} />
            <p>{selectedCharacter.description}</p>

            {oldMessages === null ? <div>
                <p>No Messages Yet</p>
                <p>Do you want to call this person?</p>
                <button>Call</button>
            </div>
                : <div>Message List</div>}

            <TextInput name="playerMessage" id="playerMessage" type="text" value={playerMessage} onChange={(e) => setPlayerMessage(e.target.value)} />
            <button>Send</button>


        </div>
    )
}