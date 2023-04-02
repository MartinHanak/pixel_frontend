import React, { ChangeEvent, useEffect } from "react"
import { useState } from "react";

import TextInput from "../components/TextInput";

import useLogin from '../hooks/useLogin'
import { useNavigate } from "react-router-dom";


export default function LoginForm() {

    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const [displayedErrors, setDisplayedErrors] = useState<string[]>([])
    const { username, jwt, login, logout, register, errors, isLoading } = useLogin()

    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("hello")
        console.log(e.target);
        await login(usernameInput, passwordInput)
    }

    useEffect(() => {
        if (username !== '') {
            logout()
        }
    }, [])

    useEffect(() => {

        setDisplayedErrors(errors);

        if (username !== '' && !isLoading && errors.length === 0) {
            navigate("/")
        }

    }, [isLoading])


    return (
        <>
            <form onSubmit={onSubmit}>

                {displayedErrors ?
                    <ul>
                        {
                            displayedErrors.map((error, id) => {
                                return <li key={id}>{error}</li>
                            })
                        }
                    </ul>
                    : null
                }

                <label htmlFor="username">Name: </label>
                <TextInput name="username" id="username" type="text"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsernameInput(e.target.value)}
                    value={usernameInput}
                />
                <br />

                <label htmlFor="password">Password: </label>
                <TextInput name="password" id="password" type="password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordInput(e.target.value)}
                    value={passwordInput}
                />
                <br />

                <button onClick={onSubmit}>
                    Login
                </button>

                <button>
                    Create an account
                </button>

            </form>


            <button onClick={logout}>
                Logout
            </button>

            <button onClick={() => register(usernameInput, passwordInput)}>
                Register
            </button>
        </>
    )
}