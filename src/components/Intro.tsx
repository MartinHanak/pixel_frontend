import React from 'react';
import Host from '../assets/images/host_cropped.png';
import { useState } from 'react';
import { convertRemToPixels } from '../utils/convert';
import { useDelayedText } from '../hooks/useDelayedText';
import { Button } from './Button';

interface Intro {
    text: string,
    close: () => void,
    show: boolean
}

export function Intro({ text, close, show }: Intro) {

    const [triangleWidth, setTriangleWidth] = useState(66); // in px
    const [borderWidth, setBorderWidth] = useState(5); // in px
    const [triangleHeight, setTriangleHeight] = useState(66); // in px

    const [displayedText, finishedDisplaying] = useDelayedText(text);



    return (
        <div className={`absolute top-0 left-0 h-full w-full ${show ? null : 'pointer-events-none'} overflow-hidden`}>
            <div className='flex gap-8 flex-col justify-end items-end h-full w-full'>
                <div
                    onClick={close}
                    className={`z-[999] relative text-xl bg-white block min-w-[12rem] max-w-[50rem] w-full border-[5px] border-orange-500 p-6 rounded-[3rem] font-bold  ${show ? 'animate-fall-down' : 'animate-hide-up'}`}>

                    <div style={{
                        width: '0px',
                        height: `${triangleHeight - borderWidth}px`,
                        bottom: `-${triangleHeight - borderWidth}px`,
                        right: `${convertRemToPixels(12) + borderWidth}px`,
                    }} className="block absolute z-[5] border-x-[33px] border-t-[33px] border-solid border-x-transparent border-t-white"></div>

                    <div style={{
                        width: '0px',
                        height: `${triangleHeight}px`,
                        bottom: `-${triangleHeight}px`,
                        right: `${convertRemToPixels(12)}px`,
                    }} className="block absolute z-1 border-x-[38px] border-t-[38px] border-solid border-x-transparent border-t-orange-500"></div>

                    <div className=' max-h-60 overflow-scroll'>
                        {displayedText}
                    </div>

                    <button className='bg-orange-300 hover:bg-orange-600 rounded-md px-4 py-2 ml-auto mt-4 block mr-[5rem]' onClick={close}>Got it!</button>

                </div>

                <div style={{ backgroundImage: `url(${Host})` }}
                    onClick={close}
                    className={`bg-cover flex-shrink w-full h-full  max-w-[24rem] max-h-[24rem] z-[999] ${show ? 'animate-go-up' : 'animate-go-right'}`}>
                </div>
            </div >
        </div>
    )
}
