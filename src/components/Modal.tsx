import React, { useState } from "react";
import close from '../assets/images/close.svg'

interface Modal {
    children: React.ReactNode,
    showModal: boolean,
    onCloseModal: () => void,
    showCloseButton?: boolean
}

export function Modal({ children, showModal, onCloseModal, showCloseButton }: Modal) {


    return (
        <>
            {showModal &&
                <div
                    className="fixed z-[9999] left-0 top-0 right-0 bottom-0 w-full h-full overflow-auto bg-black/50"
                    onClick={onCloseModal}>
                    <div
                        className="bg-white fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full md:w-1/2 max-w-lg"
                        onClick={(e) => e.stopPropagation()}>


                        {showCloseButton && <button
                            className="ml-auto block"
                            onClick={onCloseModal}>
                            <img className=" w-8 h-8" src={close} alt="close" />
                        </button>}


                        {children}


                    </div>
                </div>}
        </>
    )
}