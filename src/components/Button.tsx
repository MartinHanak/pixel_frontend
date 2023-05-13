import { useLayoutEffect, useRef, useState } from "react"
import { convertRemToPixels } from "../utils/convert";

interface Button {
    children: React.ReactNode,
    onClick: () => void
}


//        before:content-[''] before:absolute before:bg-red-500 before:z-10 before:w-16 before:h-4 before:top-0 before:-left-16 before:block before:border-y-4"

// <div onClick={onClick} style={{ transformOrigin: 'center', transform: 'rotate(-45deg)  ' }} className="inline-block absolute -left-4 top-0 bg-slate-900 text-white font-bold p-2 border-t-[5px] border-l-[5px] border-red-500  aspect-square -z-10 h-full"></div>

// {null && <div className="inline-block bg-slate-900 text-white font-bold p-2 border-y-4 border-r-4 border-red-500 h-full h-12 w-12"></div>}

export function Button({ children, onClick }: Button) {

    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const [buttonHeight, setButtonHeight] = useState(0); // in px
    const [triangleWidth, setTriangleWidth] = useState(5) // in rems
    const [borderWidth, setBorderWidth] = useState(50) // in px

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
            clipPath: `polygon(0 50%, calc(${triangleWidth}rem - ${topOffset}px + ${middleOffset}px) 0, calc(100% - ${triangleWidth}rem + ${topOffset}px - ${middleOffset}px) 0, 100% 50%, calc(100% - ${triangleWidth}rem + ${topOffset}px - ${middleOffset}px) 100%, calc(${triangleWidth}rem - ${topOffset}px + ${middleOffset}px) 100%)`
        }} className="bg-orange-500 inline-block m-0 hover:cursor-pointer"
            onClick={onClick}>

            <button onClick={() => { console.log({ top: topOffset, middle: middleOffset, width: convertRemToPixels(triangleWidth), height: buttonHeight, slope: getSlope(triangleWidth, buttonHeight), border: borderWidth }) }} ref={buttonRef} className="relative top-0 inline-block bg-slate-900 text-white font-bold p-16 text-4xl">

                <div style={{
                    clipPath: 'polygon(0 50%, 50% 0, 100% 0, 100% 100%, calc(50% + 0.05px) calc(100% + 0.5px))',
                    width: `${2 * triangleWidth}rem`,
                    left: `-${triangleWidth}rem`
                }} className="inline-block absolute bg-slate-900 h-full top-0 -z-10 "></div>

                {children}

                <div style={{
                    clipPath: 'polygon(0 0, calc(50% + 0.09px) 0, 100% 50%, calc(50% + 0.05px) calc(100% + 1px), 0 calc(100% + 1px)',
                    width: `${2 * triangleWidth}rem`,
                    right: `-${triangleWidth}rem`
                }} className="inline-block absolute bg-slate-900 h-full  top-0  -z-10 "></div>


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