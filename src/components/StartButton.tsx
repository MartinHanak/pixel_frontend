import { useLayoutEffect, useRef, useState } from "react"
import { convertRemToPixels } from "../utils/convert";
import { Placeholder } from "./Placeholder";
import { useAppSelector } from "../hooks/typedStoreHooks";
import { RootState } from "../store/store";

interface StartButton {
    children: React.ReactNode,
    onClick: (...args: any[]) => void,
}

export function StartButton({ children, onClick }: StartButton) {

    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const status = useAppSelector((state: RootState) => state.game.status);

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
            clipPath: `polygon(0 50%, calc(${triangleWidth}rem - ${topOffset}px + ${middleOffset}px) 0, calc(100% - ${triangleWidth}rem + ${topOffset}px - ${middleOffset}px) 0, 100% 50%, calc(100% - ${triangleWidth}rem + ${topOffset}px - ${middleOffset}px) 100%, calc(${triangleWidth}rem - ${topOffset}px + ${middleOffset}px) 100%)`
        }} className={`bg-green-700 opacity-100  group hover:bg-green-400 inline-block m-0  self-center flex-grow basis-1/3  hover:cursor-pointer `}
            onClick={onClick}>

            <button ref={buttonRef} className={`relative top-0 inline-block bg-green-800 group-hover:bg-green-500 text-white font-bold p-4 w-full h-full text-center text-lg`}>

                <div style={{
                    clipPath: 'polygon(0 50%, 50% 0, 100% 0, 100% 100%, calc(50% + 0.05px) calc(100% + 0.5px))',
                    width: `${2 * triangleWidth}rem`,
                    left: `-${triangleWidth}rem`
                }} className={`inline-block absolute bg-green-800 group-hover:bg-green-500 h-full top-0 -z-10 `}></div>

                {status === 'idle' ? children : <Placeholder />}

                <div style={{
                    clipPath: 'polygon(0 0, calc(50% + 0.09px) 0, 100% 50%, calc(50% + 0.05px) calc(100% + 1px), 0 calc(100% + 1px)',
                    width: `${2 * triangleWidth}rem`,
                    right: `-${triangleWidth}rem`
                }} className={`inline-block absolute bg-green-800 group-hover:bg-green-500 h-full  top-0  -z-10 `}></div>


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