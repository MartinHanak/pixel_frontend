import React from "react"

interface Message {
    children: React.ReactNode,
    user?: boolean,
    ref?: React.MutableRefObject<HTMLDivElement> | null
}

export function Message({ children, user = false, ref }: Message) {
    return (
        <div className={`${user ? "bg-slate-200" : "bg-gray-300"}
        ${user ? "after:border-l-slate-200 after:border-r-transparent" : "after:border-r-gray-300 after:border-l-transparent"}
        ${user ? "after:-right-4" : "after:-left-4"}
        ${user ? "after:border-l-[16px]" : "after:border-r-[16px]"}
        relative p-4 w-full m-4 rounded-md 
        after:content-[''] after:block after:absolute after:w-0 after:h-0  after:top-2  after:border-solid  after:border-b-[16px] after:border-b-transparent  `} ref={ref ? ref : undefined}>
            {children}
        </div>
    )
}