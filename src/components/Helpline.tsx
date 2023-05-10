import { useAppDispatch, useAppSelector } from "../hooks/typedStoreHooks"
import { RootState } from "../store/store"
import { useState } from "react";

import Yoda from '../assets/images/Yoda.png'
import Pikachu from '../assets/images/Pikachu.png'
import { CharacterIcon } from "./CharacterIcon";
import { CharacterList } from "./CharacterList";
import { CharacterDetails } from "./CharacterDetails";

export interface message {
    role: "assistant" | "user" | "system",
    content: string
}

export interface character {
    name: string,
    description: string,
    imageSrc: string,
}

const availableCharacter: character[] = [
    {
        name: 'Yoda',
        description: 'A jedi master, I am.',
        imageSrc: Yoda
    },
    {
        name: 'Pikachu',
        description: 'Pika, pika',
        imageSrc: Pikachu
    }
]


export function Helpline() {

    const dispatch = useAppDispatch()
    const gameId = useAppSelector((state: RootState) => state.game.gameId);
    const questionOrder = useAppSelector((state: RootState) => state.game.questionOrder);

    const [selectedCharacter, setSelectedCharacter] = useState<character | null>(null);
    const [oldMessages, setOldMessages] = useState<message[] | null>(null)


    return (
        <div>
            <h2>Select Who to Call</h2>
            <button>Close</button>


            {selectedCharacter === null ?
                <CharacterList characterList={availableCharacter} setSelectedCharacter={setSelectedCharacter} />
                :
                <CharacterDetails
                    selectedCharacter={selectedCharacter}
                    oldMessages={oldMessages}
                    cancelSelection={() => setSelectedCharacter(null)}
                />
            }
        </div >
    )
}