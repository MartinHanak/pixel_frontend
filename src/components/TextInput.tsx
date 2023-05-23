import React from "react"


interface TextInputInterface {
    name: string,
    id: string,
    type: "text" | "password",
    onChange: (React.ChangeEventHandler<HTMLInputElement>),
    value: string
}

export default function TextInput(props: TextInputInterface) {

    return (
        <input className="bg-gray-300 py-0  w-full md:w-2/3 px-2 my-0 border-solid border-b-2 border-black rounded-lg justify-self-start" name={props.name} id={props.id} type={props.type} onChange={props.onChange} value={props.value} />
    )
}