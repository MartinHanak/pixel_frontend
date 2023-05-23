import { useAppDispatch, useAppSelector } from "../hooks/typedStoreHooks"
import { RootState } from "../store/store"
import React, { useState, useRef } from "react";

import Yoda from '../assets/images/Yoda.png'
import Pikachu from '../assets/images/Pikachu.png'
import Gollum from '../assets/images/Gollum.png'
import Trump from '../assets/images/Trump.jpg'

import closeIcon from '../assets/images/close.svg'
import minimizeIcon from '../assets/images/minimize.svg'
import backIcon from '../assets/images/back.svg'

import { CharacterIcon } from "./CharacterIcon";
import { CharacterList } from "./CharacterList";
import { CharacterDetails } from "./CharacterDetails";
import { resetHelplineMessages } from "../reducers/gameSlice";
import { Button } from "./Button";
import { convertRemToPixels } from "../utils/convert";

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
    },
    {
        name: 'Gollum',
        description: 'My precious',
        imageSrc: Gollum
    },
    {
        name: 'Trump',
        description: 'I\'m the best',
        imageSrc: Trump
    }
]


interface Helpline {
    close: () => void
}

export function Helpline({ close }: Helpline) {

    const dispatch = useAppDispatch()
    const gameId = useAppSelector((state: RootState) => state.game.gameId);
    const questionOrder = useAppSelector((state: RootState) => state.game.questionOrder);

    const oldMessages = useAppSelector((state: RootState) => state.game.oldHelplineMessages)

    const [selectedCharacter, setSelectedCharacter] = useState<character | null>(null);

    const container = useRef<HTMLDivElement>(null)
    const [originalHeight, setOriginalHeight] = useState<number | null>(null)


    const cancelSelection = () => {
        dispatch(resetHelplineMessages())
        setSelectedCharacter(null)
    }

    const minimize = () => {
        if (container.current) {
            if (originalHeight && !isNaN(originalHeight)) {
                container.current.style.height = `${originalHeight}px`
                setOriginalHeight(null)
            } else {
                setOriginalHeight(container.current.clientHeight)

                container.current.style.height = `${convertRemToPixels(5)}px`

            }
        }
    }


    return (
        <div ref={container} className="bg-white absolute z-[1000] max-h-[48rem] h-[90vh]  md:h-[75vh]  sm:max-w-xl w-full md:w-1/2 p-4 border-solid border-[5px] border-y-gray-800 border-x-gray-900 overflow-hidden top-0 left-0">

            <div className="grid grid-cols-2 grid-rows-1 justify-items-end items-start border-solid border-gray-300 border-b-2">
                <div className="justify-self-start">
                    {selectedCharacter === null ?
                        <h2 className="font-bold text-xl">Select Who to Call</h2>
                        :
                        <button onClick={cancelSelection}><img className="w-8 h-8" src={backIcon} alt="back to selection" /></button>
                    }
                </div>
                <div className="flex gap-4">
                    <button onClick={minimize}><img className="w-8 h-8" src={minimizeIcon} alt="minimize" /></button>
                    <button onClick={close}><img className="w-8 h-8" src={closeIcon} alt="close" /></button>
                </div>
            </div>


            {selectedCharacter === null ?
                <CharacterList characterList={availableCharacter} setSelectedCharacter={setSelectedCharacter} />
                :
                <CharacterDetails
                    selectedCharacter={selectedCharacter}
                    oldMessages={oldMessages}
                    cancelSelection={cancelSelection}
                />
            }
        </div >
    )
}