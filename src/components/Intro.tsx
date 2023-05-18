import React from 'react';
import Host from '../assets/images/host_cropped.png';
import { useState } from 'react';
import { convertRemToPixels } from '../utils/convert';
import { useDelayedText } from '../hooks/useDelayedText';
import { Button } from './Button';

interface Intro {
    text: string
}

export function Intro({ text }: Intro) {

    const [triangleWidth, setTriangleWidth] = useState(66); // in px
    const [borderWidth, setBorderWidth] = useState(5); // in px
    const [triangleHeight, setTriangleHeight] = useState(66); // in px

    const [displayedText, finishedDisplaying] = useDelayedText(text);



    return (
        <div className='absolute w-screen h-screen  justify-center items-start'>
            <div className='flex '>
                <div
                    className={`relative text-xl bg-white block max-w-xl border-[5px] border-orange-500 p-6 rounded-[3rem] font-bold`}>

                    <div style={{
                        width: '0px',
                        height: `${triangleHeight - borderWidth}px`,
                        bottom: `-${triangleHeight - borderWidth}px`,
                        right: `${convertRemToPixels(3) + borderWidth}px`,
                    }} className="block absolute z-[5] border-x-[33px] border-t-[33px] border-solid border-x-transparent border-t-white"></div>

                    <div style={{
                        width: '0px',
                        height: `${triangleHeight}px`,
                        bottom: `-${triangleHeight}px`,
                        right: `${convertRemToPixels(3)}px`,
                    }} className="block absolute z-1 border-x-[38px] border-t-[38px] border-solid border-x-transparent border-t-orange-500"></div>

                    <div className=' max-h-60 overflow-scroll'>
                        {displayedText}
                    </div>

                    {finishedDisplaying && <Button onClick={() => { console.log('click') }}>Close</Button>}

                </div>

                <div style={{ backgroundImage: `url(${Host})` }}
                    className='bg-cover flex-shrink-0 w-[24rem] h-128'>
                </div>
            </div >
        </div>
    )
}
