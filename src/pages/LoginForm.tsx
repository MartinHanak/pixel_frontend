import React, { ChangeEvent, useEffect } from "react"
import { useState } from "react";
import TextInput from "../components/TextInput";

import { login } from "../reducers/login";
import { register } from "../reducers/register";
import { useAppDispatch, useAppSelector } from "../hooks/typedStoreHooks";

interface LoginForm {
    close: () => void
}


export default function LoginForm({ close }: LoginForm) {

    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [showLogin, setShowLogin] = useState(true);

    const [displayedErrors, setDisplayedErrors] = useState<string[]>([])
    const error = useAppSelector((state) => state.login.error)

    const dispatch = useAppDispatch()


    const onSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        if (showLogin) {
            dispatch(login({ inputUsername: usernameInput, inputPassword: passwordInput }))
                .unwrap()
                .then(() => close())
                .catch((err) => console.log(err))
        } else {
            if (passwordInput === passwordConfirm) {
                // register
                dispatch(register({ inputUsername: usernameInput, inputPassword: passwordInput }))
                    .unwrap()
                    .then(() => close())
                    .catch((err) => console.log(err))
            } else {
                setDisplayedErrors(['Passwords do not match.'])
            }
        }
    }

    useEffect(() => {
        if (displayedErrors.length > 0) {
            setDisplayedErrors([])
        }
    }, [usernameInput, passwordInput, passwordConfirm])


    useEffect(() => {
        setDisplayedErrors([error?.message || 'Could not get a response. Try again later.']);
    }, [error])

    useEffect(() => {
        setDisplayedErrors([])
    }, [showLogin])


    return (
        <>
            <div className="w-full flex items-center justify-center gap-4 border-b-2 border-solid border-gray-300 pb-2 mb-2">
                <span onClick={() => { setShowLogin(true) }} className={`${showLogin ? 'underline' : null} cursor-pointer`}>Login</span>
                |
                <span onClick={() => { setShowLogin(false) }} className={`${showLogin ? null : 'underline'} cursor-pointer`}>Register</span>
            </div>

            <form onSubmit={onSubmit}>

                {displayedErrors ?
                    <ul className="mb-4">
                        {
                            displayedErrors.map((error, id) => {
                                return (
                                    <li key={id}
                                        className="bg-red-500 border-solid border-4 border-red-700 font-bold text-white py-2 px-4">
                                        {error}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    : null
                }

                <div className="grid grid-cols-form grid-rows-2 gap-x-4 gap-y-2">
                    <label className="justify-self-end" htmlFor="username">Name: </label>
                    <TextInput
                        name="username" id="username" type="text"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUsernameInput(e.target.value)}
                        value={usernameInput}
                    />



                    <label className="justify-self-end" htmlFor="password">Password: </label>
                    <TextInput name="password" id="password" type="password"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordInput(e.target.value)}
                        value={passwordInput}
                    />


                    {showLogin === false && <>
                        <label className="justify-self-end" htmlFor="passwordConfirm">Confirm Password: </label>
                        <TextInput name="passwordConfirm" id="passwordConfirm" type="password"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value)}
                            value={passwordConfirm}
                        />
                    </>}

                </div>


                <button onClick={onSubmit}>
                    {showLogin ? 'Log In' : 'Register'}
                </button>

            </form>
        </>
    )
}