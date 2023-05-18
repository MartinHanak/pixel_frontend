import { useEffect, useState } from "react"
import { Button } from "./Button"

import closeIcon from '../assets/images/close.svg'


interface Audience {
    votes: {
        [key: string]: number
    } | null,
    close: () => void
}

export function Audience({ votes, close }: Audience) {

    const [percentageHeights, setPercentageHeights] = useState<{ [key: string]: number }>({})

    useEffect(() => {
        if (votes) {
            const sum = votes.A + votes.B + votes.C + votes.D;

            const percentHeights = {
                A: votes.A / sum,
                B: votes.B / sum,
                C: votes.C / sum,
                D: votes.D / sum
            }

            setPercentageHeights(percentHeights);
        }
    }, [votes])

    return (
        <div className="bg-white absolute z-[1000] block w-64 h-64 p-4 border-solid border-[5px] border-y-gray-800 border-x-gray-900 top-0 left-0">

            <div className="border-solid border-gray-300 border-b-2  pb-2 mb-0">
                <button className="ml-auto w-8 h-8 block" onClick={close}><img className="w-8 h-8" src={closeIcon} alt="close" /></button>
            </div>

            <div className="grid justify-items-center grid-cols-4 grid-rows-1 h-[10rem]">

                {Object.keys(percentageHeights).map((keyName: keyof typeof percentageHeights) => {
                    return (<div key={keyName} className="flex flex-col justify-end items-center font-bold ">

                        <div style={{ height: `${percentageHeights[keyName] * 100}%` }}
                            className="bg-red-500 w-4"></div>


                    </div>)
                })}
            </div>

            <div className="grid justify-items-center grid-cols-4 grid-rows-1 pt-0">
                {Object.keys(percentageHeights).map((keyName: keyof typeof percentageHeights) => {
                    return (<div key={keyName} className="flex flex-col justify-end items-center font-bold ">

                        <div>{keyName}</div>
                    </div>)
                })}
            </div>


        </div>
    )
}