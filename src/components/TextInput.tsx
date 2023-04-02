import React from "react"


interface TextInputInterface {
    name: string,
    id: string,
    type: "text" | "password",
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string
}

export default function TextInput(props: TextInputInterface) {

    return (
        <input name={props.name} id={props.id} type={props.type} onChange={props.onChange} value={props.value} />
    )
}