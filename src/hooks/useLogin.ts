import { useState } from 'react'
import { BACKEND_URL } from '../utils/config'

import { useAppDispatch, useAppSelector } from './typedStoreHooks';

import { login as loginAction } from '../reducers/loginSlice';
import { logout as logoutAction } from '../reducers/loginSlice';

export default function useLogin() {

    const username = useAppSelector((state) => state.login.username)
    const jwt = useAppSelector((state) => state.login.jwt)

    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading ] = useState(false);
    const [errors, setErrors ] = useState<string[]>([]);


    async function login(inputUsername: string, inputPassword: string) {
        // try sending REST request
        setIsLoading(true)
        
        const response = await fetch(`${BACKEND_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                username: inputUsername, 
                password: inputPassword
            })
        })


        if(response.ok) {
            console.log("res is ok")
            const jsonData = await response.json();
            // saved to local storage if page reloaded
            localStorage.setItem("username", jsonData.username);
            localStorage.setItem("jwt", jsonData.token);
            // saved to store for SPA
            dispatch(loginAction({username: jsonData.username, jwt: jsonData.token}));
            setErrors([])
            setIsLoading(false);
        } else {
            const newErrorMessages = await extractErrors(response);
            setErrors(newErrorMessages);
            setIsLoading(false);
            console.log(newErrorMessages);
        }

    }

    async function register(inputUsername: string, inputPassword: string) {
        // try sending REST request
        setIsLoading(true);

        const response = await fetch(`${BACKEND_URL}/api/users`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                username: inputUsername, 
                password: inputPassword
            })
        })

         if(response.ok) {
            console.log("res is ok")
            const jsonData = await response.json();

            // login after successful registration

            // saved to local storage if page reloaded
            localStorage.setItem("username", jsonData.username);
            localStorage.setItem("jwt", jsonData.token);
            // saved to store for SPA
            dispatch(loginAction({username: jsonData.username, jwt: jsonData.token}));
            setErrors([])
            setIsLoading(false);
        } else {
            const newErrorMessages = await extractErrors(response);
            setErrors(newErrorMessages);
            setIsLoading(false);
            console.log(newErrorMessages);
        }
    }

    function logout() {
        // remove jwt from localstorage and store
        localStorage.setItem("username", '');
        localStorage.setItem("jwt", '');

        dispatch(logoutAction());
    }

    async function extractErrors(response: Response) {
        const jsonData = await response.json();
        let errorMessages: string[] = [];

        if(jsonData.error ) {
            if (Array.isArray(jsonData.error)) {
                errorMessages = [...jsonData.error]
            } else if (typeof jsonData.error === "string" || jsonData.error instanceof String ) {
                errorMessages = [jsonData.error]
            } else {
                errorMessages = ["Backend response could not be parsed."]
            }
        }

        return errorMessages;
    }


    return {
        username,
        jwt,
        login,
        logout,
        register,
        errors,
        isLoading
    }
}