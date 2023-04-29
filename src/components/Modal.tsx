import React, { useState } from "react";

export function Modal(children: React.ReactNode) {

    const showModal = useState<boolean>(false);

    return (
        showModal ? { children } : null
    )
}