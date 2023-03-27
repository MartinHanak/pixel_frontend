import React from "react"

import { useAppDispatch, useAppSelector } from "../hooks/typedStoreHooks";
import { login, logout } from '../reducers/loginSlice'

export default function LoginForm() {

    const loginUser = useAppSelector(state => state.login)
    const dispatch = useAppDispatch()

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("hello")
        dispatch(login({ username: "test", jwt: "test jwt" }))
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="username">Name: </label>
            <input type="text" name="username" id="username" />
            <br />

            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" />
            <br />

            <button onClick={onSubmit}>
                Login
            </button>

            <button>
                Create an account
            </button>
        </form>
    )
}