import React, { useState } from "react";

interface Modal {
    children: React.ReactNode
}

export function Modal({ children }: Modal) {

    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Show Modal</button>
            {showModal &&
                <div
                    className="fixed z-10 left-0 top-0 right-0 bottom-0 w-full h-full overflow-auto bg-black/50"
                    onClick={() => setShowModal(false)}>
                    <div
                        className="bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-1/2"
                        onClick={(e) => e.stopPropagation()}>

                        <button onClick={() => setShowModal(false)}>Hide modal</button>
                        {children}

                    </div>
                </div>}
        </>
    )
}