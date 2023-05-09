import React, { useState } from "react";

interface Modal {
    children: React.ReactNode,
    showModal: boolean,
    onCloseModal: () => void,
    hideButtonText?: string
}

export function Modal({ children, showModal, onCloseModal, hideButtonText }: Modal) {


    return (
        <>
            {showModal &&
                <div
                    className="fixed z-10 left-0 top-0 right-0 bottom-0 w-full h-full overflow-auto bg-black/50"
                    onClick={onCloseModal}>
                    <div
                        className="bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-1/2"
                        onClick={(e) => e.stopPropagation()}>

                        {children}
                        <button onClick={onCloseModal}>
                            {hideButtonText ? hideButtonText : "Hide Modal"}
                        </button>

                    </div>
                </div>}
        </>
    )
}