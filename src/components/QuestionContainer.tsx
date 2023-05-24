import { useLayoutEffect, useRef, useState } from "react"
import { convertRemToPixels } from "../utils/convert";

interface QuestionContainer {
    children: React.ReactNode,
}


export function QuestionContainer({ children }: QuestionContainer) {

    const containerRef = useRef<HTMLDivElement | null>(null)

    const [containerHeight, setContainerHeight] = useState(0); // in px
    const [triangleWidth, setTriangleWidth] = useState(1) // in rems
    const [borderWidth, setBorderWidth] = useState(5) // in px

    const [middleOffset, setMiddleOffset] = useState(1) // in px
    const [topOffset, setTopOffset] = useState(1) // in px

    const handleClick = () => {

        const selection = window.getSelection()

        if (containerRef.current !== null && selection !== null) {

            selection.removeAllRanges()

            const range = document.createRange()
            range.selectNode(containerRef.current)
            selection.addRange(range)

        }
    }

    useLayoutEffect(() => {
        if (containerRef.current) {
            const { height } = containerRef.current.getBoundingClientRect()
            setContainerHeight(height)

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
        }} className="bg-orange-500 inline-block m-0 w-full mb-4 mt-0"
        >

            <div ref={containerRef} onClick={handleClick} className="relative top-0 inline-block bg-slate-900 text-white font-bold p-4 w-full text-center">

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


            </div>
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