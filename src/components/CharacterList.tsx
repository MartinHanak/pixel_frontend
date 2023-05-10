import { character } from "./Helpline"
import { CharacterIcon } from "./CharacterIcon"
import React from "react"

interface CharacterList {
    characterList: character[],
    setSelectedCharacter: React.Dispatch<React.SetStateAction<character | null>>
}

export function CharacterList({ characterList, setSelectedCharacter }: CharacterList) {

    return (
        <>
            {characterList.map((character: character) => {
                return (
                    <div key={character.name} >
                        <h3>{character.name}</h3>
                        <CharacterIcon imageSrc={character.imageSrc} />
                        <p>{character.description}</p>
                        <button onClick={() => setSelectedCharacter(character)}>View Details</button>
                    </div>
                )
            })}
        </>
    )
}