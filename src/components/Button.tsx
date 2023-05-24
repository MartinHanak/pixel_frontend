import { useLayoutEffect, useRef, useState } from "react"
import { convertRemToPixels } from "../utils/convert";

interface Button {
    children: React.ReactNode,
    onClick: (...args: any[]) => void,
    disabled?: boolean,
    selected?: boolean,
    correctAnswer?: boolean,
    wrongAnswer?: boolean,
    className?: string
}

export function Button({ children, onClick, disabled = false, selected = false, correctAnswer = false, wrongAnswer = false, className }: Button) {

    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const [buttonHeight, setButtonHeight] = useState(0); // in px
    const [triangleWidth, setTriangleWidth] = useState(1) // in rems
    const [borderWidth, setBorderWidth] = useState(5) // in px

    const [middleOffset, setMiddleOffset] = useState(1) // in px
    const [topOffset, setTopOffset] = useState(1) // in px

    useLayoutEffect(() => {
        if (buttonRef.current) {
            const { height } = buttonRef.current.getBoundingClientRect()
            setButtonHeight(height)

            const slope = getSlope(triangleWidth, height);

            const middleOffset = getMiddleOffset(slope, borderWidth)

            setMiddleOffset(middleOffset);

            setTopOffset(getTopOffset(slope, borderWidth, triangleWidth, height));

        }
    }, [children])

    return (
        <div style={{
            paddingTop: `${borderWidth}px`,
            paddingBottom: `${borderWidth}px`,
            paddingLeft: `calc(${triangleWidth}rem + ${middleOffset}px)`,
            paddingRight: `calc(${triangleWidth}rem + ${middleOffset}px)`,
            clipPath: `polygon(0 50%, calc(${triangleWidth}rem - ${topOffset}px + ${middleOffset}px) 0, calc(100% - ${triangleWidth}rem + ${topOffset}px - ${middleOffset}px) 0, 100% 50%, calc(100% - ${triangleWidth}rem + ${topOffset}px - ${middleOffset}px) 100%, calc(${triangleWidth}rem - ${topOffset}px + ${middleOffset}px) 100%)`,
            opacity: disabled ? '0' : '1'
        }} className={`${selected ? 'bg-orange-700' : 'bg-orange-500'} group hover:bg-orange-700 inline-block m-0  flex-shrink flex-grow sm:basis-1/3 basis-2/3 hover:cursor-pointer ${disabled ? 'pointer-events-none' : null}
        ${correctAnswer ? 'animate-win' : null} ${wrongAnswer ? 'animate-wrong' : null} ${className ? className : null}`}
            onClick={onClick}>

            <button ref={buttonRef} className={`relative top-0 inline-block ${selected ? 'bg-slate-800' : 'bg-slate-900'} group-hover:bg-slate-800 text-white font-bold p-4 w-full h-full text-left ${correctAnswer ? 'animate-win' : null} ${wrongAnswer ? 'animate-wrong' : null}`}>

                <div style={{
                    clipPath: 'polygon(0 50%, 50% 0, 100% 0, 100% 100%, calc(50% + 0.05px) calc(100% + 0.5px))',
                    width: `${2 * triangleWidth}rem`,
                    left: `-${triangleWidth}rem`
                }} className={`inline-block absolute ${selected ? 'bg-slate-800' : 'bg-slate-900'} group-hover:bg-slate-800 h-full top-0 -z-10 ${correctAnswer ? 'animate-win' : null} ${wrongAnswer ? 'animate-wrong' : null}`}></div>

                {children}

                <div style={{
                    clipPath: 'polygon(0 0, calc(50% + 0.09px) 0, 100% 50%, calc(50% + 0.05px) calc(100% + 1px), 0 calc(100% + 1px)',
                    width: `${2 * triangleWidth}rem`,
                    right: `-${triangleWidth}rem`
                }} className={`inline-block absolute ${selected ? 'bg-slate-800' : 'bg-slate-900'} group-hover:bg-slate-800 h-full  top-0  -z-10 ${correctAnswer ? 'animate-win' : null} ${wrongAnswer ? 'animate-wrong' : null}`}></div>


            </button>
        </div>
    )

}



// slope for the triangle border
// width in rems, height in px
// angle in radians
function getSlope(width: number, buttonHeight: number) {
    const widthInPx = convertRemToPixels(width);

    const slope = Math.atan(widthInPx / (buttonHeight / 2))

    return slope
}

// offset for the top of the triangle
function getMiddleOffset(slope: number, borderWidth: number) {
    const offset = borderWidth / Math.cos(slope)

    return offset
}

function getTopOffset(slope: number, borderWidth: number, triangleWidth: number, buttonHeight: number) {

    const triangleWidthInPx = convertRemToPixels(triangleWidth)

    const offset = getMiddleOffset(slope, borderWidth) - (2 * borderWidth * triangleWidthInPx) / buttonHeight;

    return offset
}