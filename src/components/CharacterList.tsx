import { character } from "./Helpline"
import { CharacterIcon } from "./CharacterIcon"
import React from "react"
import { Button } from "./Button"
import { Message } from "./Message"
import { useAppDispatch } from "../hooks/typedStoreHooks"
import { fetchHelpline } from "../reducers/fetchHelpline";
import phone from '../assets/images/phone.svg'



interface CharacterList {
    characterList: character[],
    setSelectedCharacter: React.Dispatch<React.SetStateAction<character | null>>
}

export function CharacterList({ characterList, setSelectedCharacter }: CharacterList) {

    const dispatch = useAppDispatch()

    const handleCall = (character: character) => {
        setSelectedCharacter(character)

        dispatch(fetchHelpline({ selectedCharacter: character }))
    }

    return (
        <div style={{ maxHeight: 'calc(100% - 4rem)' }} className="overflow-scroll ">
            {characterList.map((character: character) => {
                return (
                    <div key={character.name} className="flex pb-8 px-4 mt-4 border-b-2 border-solid border-gray-200" >
                        <CharacterIcon imageSrc={character.imageSrc} />
                        <div className="flex flex-col items-center pl-4 w-full">
                            <h3 className="text-lg font-bold pl-8 self-start">{character.name}</h3>

                            <Message>{character.description}</Message>
                            <button className="bg-green-500 px-4 py-2 rounded-md flex items-center align-middle gap-4 text-white font-bold hover:bg-green-700" onClick={() => handleCall(character)}>
                                <span>Call</span>
                                <img className="w-6 h-6" src={phone} alt="phone" />
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}