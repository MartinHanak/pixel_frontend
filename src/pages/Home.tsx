import { NewGame } from "../components/NewGame"
import { Placeholder } from "../components/Placeholder"
import { convertRemToPixels } from "../utils/convert"
import { useEffect, useState } from "react"
import Host from '../assets/images/host_cropped.png'
import { useDelayedText } from "../hooks/useDelayedText"

const messages = ['Let\'s play', 'Hurry up already!',
    "Ready to unlock your fortune? Join me on Who Wants to Be a Millionaire and prove you're the ultimate brainiac!",
    "Imagine the rush of winning life-changing wealth. Will you seize the $1 million prize on Who Wants to Be a Millionaire?",
    "Become a legend! Claim the millionaire title right in front of you.",
    "Learn, laugh, and earn on Who Wants to Be a Millionaire. Let's create an unforgettable experience together.",
    "I'll support you with lifelines. Conquer Who Wants to Be a Millionaire with the crowd cheering you on.",
    "Picture the applause, the triumph. The millionaire moment awaits you.",
    "Play Who Wants to Be a Millionaire and join the millionaire club.",
    "Create lasting memories. Win big on Who Wants to Be a Millionaire.",
    "Dare to win! Rise to greatness on Who Wants to Be a Millionaire.",
    "Picture this: the moment of truth. Will you walk away with a million-dollar smile? Join Who Wants to Be a Millionaire and find out.",
    "Are you ready to ignite your fortune? Step into the ultimate challenge that awaits, where brilliance and wealth collide.",
    "Unleash your inner genius and claim the grand prize that awaits those who dare to conquer the ultimate game of knowledge and wealth.",
    "Picture yourself on the edge of victory, facing mind-bending challenges that can lead to a life-altering fortune. Will you seize the opportunity?",
    "Join the prestigious league of those who have cracked the code to success, where wisdom and riches intertwine. Your moment to shine is here.",
    "It's time to challenge your limits, push the boundaries, and embark on a journey that holds the key to unlocking extraordinary wealth.",
    "Dare to rewrite your destiny by stepping into the realm of high-stakes challenges, where your intellect can pave the way to unimaginable riches.",
    "Seize the opportunity to redefine what's possible. Embark on a quest that promises not just wealth, but a legacy that will be remembered for ages.",
    "Harness the power of knowledge and let it propel you towards a future brimming with opulence. Your path to abundance begins now.",
    "Break free from the ordinary and set your sights on a realm where dreams become reality. Will you grasp the golden opportunity that awaits?",
    "Embrace the thrill of the unknown, as you face electrifying trials that can lead to a life of luxury. The choice is yours."]


interface Home {
    showLogin: () => void
}

export default function Home({ showLogin }: Home) {

    const [borderWidth, setBorderWidth] = useState(5); // in px
    const [triangleHeight, setTriangleHeight] = useState(66); // in px

    const [currentMessage, setCurrentMessage] = useState(messages[0])
    const [displayedText, finished] = useDelayedText(currentMessage);

    useEffect(() => {

        const generateNewMessageInterval = setInterval(() => {
            let selectingDifferentMessage = true;

            while (selectingDifferentMessage) {
                const index = Math.round(Math.random() * (messages.length - 1))
                if (index === messages.indexOf(currentMessage)) {
                    console.log('Selected the same message')
                    selectingDifferentMessage = true;
                } else {
                    selectingDifferentMessage = false;
                    if (finished === true) {
                        setCurrentMessage(messages[index])
                    }
                }
            }
        }, 5000)


        return () => {
            clearInterval(generateNewMessageInterval)
        }

    }, [finished, currentMessage])

    return (
        <div className="w-full h-full grid grid-cols-1  md:grid-cols-2  auto-rows-min">

            <div className="col-span-1 md:col-span-2 row-span-1 p-8 min-h-[15rem] flex flex-col justify-end">
                <div
                    className={`relative text-xl bg-white block min-w-[280px] sm:min-w-[24rem] max-w-[50rem]  border-[5px] border-orange-500 p-6 rounded-[3rem] font-bold mb-8 pl-12`}>

                    <div style={{
                        width: '0px',
                        height: `${triangleHeight - borderWidth}px`,
                        bottom: `-${triangleHeight - borderWidth}px`,
                        left: `${convertRemToPixels(10) + borderWidth}px`,
                    }} className=" block absolute z-[5] border-x-[33px] border-t-[33px] border-solid border-x-transparent border-t-white"></div>

                    <div style={{
                        width: '0px',
                        height: `${triangleHeight}px`,
                        bottom: `-${triangleHeight}px`,
                        left: `${convertRemToPixels(10)}px`,
                    }} className="block absolute z-1 border-x-[38px] border-t-[38px] border-solid border-x-transparent border-t-orange-500"></div>

                    <div className='w-full max-h-60 overflow-scroll'>
                        {displayedText === '' ? <Placeholder dark /> : displayedText}
                    </div>

                    {null && <button className={`bg-orange-300 hover:bg-orange-600 rounded-md px-4 py-2 ml-8  mt-4 block mr-[2rem] ${displayedText === '' ? 'opacity-0 pointer-events-none' : null}`} onClick={() => setCurrentMessage('')} >Got it!</button>}

                </div>
            </div>


            <div style={{ backgroundImage: `url(${Host})` }}
                className={`bg-cover  aspect-square max-w-[24rem] transform scale-x-[-1] col-span-1 row-span-1`}>
            </div>

            <div className="w-full col-span-1 row-span-1 order-[-1] md:order-3 my-4">
                <NewGame showLogin={showLogin} />
            </div>
        </div>
    )
}