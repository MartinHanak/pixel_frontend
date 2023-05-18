import { useEffect, useRef } from "react"

import phone from '../assets/images/phone.svg'
import icon5050 from '../assets/images/5050.svg'
import audience from '../assets/images/audience.svg'
import { useAppSelector } from "../hooks/typedStoreHooks"
import { RootState } from "../store/store"
import { Root } from "react-dom/client"
import { Placeholder } from "./Placeholder"

interface GameProgress {
    currentQuestion: number,
    numberOfQuestions?: number,
    handleAudience: () => void,
    handle5050: () => void,
    handleHelpline: () => void
}

const values = [100, 200, 300, 500, 1000,
    2000, 4000, 8000, 16000, 32000,
    64000, 125000, 250000, 500000, 1000000]

export function GameProgress({ currentQuestion, numberOfQuestions = 15, handleAudience, handle5050, handleHelpline }: GameProgress) {

    const used5050 = useAppSelector((state: RootState) => state.game.used5050);
    const usedAudience = useAppSelector((state: RootState) => state.game.usedAudience);
    const usedHelpline = useAppSelector((state: RootState) => state.game.usedHelpline);

    const question = useAppSelector((state: RootState) => state.game.currentQuestion);
    const questionOrder = useAppSelector((state: RootState) => state.game.questionOrder);

    const currentDiv = useRef<HTMLDivElement>(null);

    useEffect(() => {
        currentDiv.current?.scrollIntoView({ behavior: "smooth", block: 'nearest' })
    }, [currentQuestion])


    return (
        <div className="w-1/2 ml-auto mb-8 mt-8 mr-8">
            <div className="flex items-center justify-end flex-nowrap gap-4 mr-8">

                {question || (questionOrder && questionOrder > 1) ?
                    <button className={`bg-slate-800 border-solid border-[3px] border-orange-500 rounded-full p-1 h-8 w-10 flex justify-center items-center hover:bg-slate-700 hover:border-orange-800 ${usedAudience ? 'pointer-events-none opacity-0' : null}`} onClick={handleAudience}>
                        <img className="w-8 h-4" src={audience} alt="audience" />
                    </button>
                    : <Placeholder />}

                {question || (questionOrder && questionOrder > 1) ?
                    <button className={`bg-slate-800 border-solid border-[3px] border-orange-500 rounded-full p-1 h-8 w-10 flex justify-center items-center hover:bg-slate-700 hover:border-orange-800 ${used5050 ? 'pointer-events-none opacity-0' : null}`} onClick={handle5050}>
                        <img className="w-8 h-4" src={icon5050} alt="50:50" />
                    </button>
                    : <Placeholder />}

                {question || (questionOrder && questionOrder > 1) ?
                    <button className={`bg-slate-800 border-solid border-[3px] border-orange-500 rounded-full p-1 h-8 w-10 flex justify-center items-center hover:bg-slate-700 hover:border-orange-800 ${usedHelpline ? 'pointer-events-none opacity-0' : null}`} onClick={handleHelpline}>
                        <img className="w-8 h-4" src={phone} alt="helpline" />
                    </button>
                    : <Placeholder />}
            </div>

            <div className="relative overflow-scroll p-4 max-h-[10rem] sm:max-h-full">
                {values.slice(0).reverse().map((value: number, index: number) => {
                    return (<div key={index} className="flex items-end flex-col">
                        <div ref={15 - index === currentQuestion ? currentDiv : null}
                            className={`${index % 5 === 0 ? `border-solid border-t-2 border-gray-700 w-1/3 ` : null}
                        ${15 - index < currentQuestion && `text-gray-900`} 
                        ${15 - index > currentQuestion && `text-gray-200`} 
                        ${15 - index === currentQuestion && `text-yellow-500`} 
                         text-end font-bold w-full`}> {value} €</div>
                    </div>)
                })}
            </div>


        </div>
    )
}