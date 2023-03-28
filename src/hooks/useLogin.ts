import { useState } from 'react'
import { BACKEND_URL } from '../utils/config'

export default function useLogin() {
    const [username, setUsername] = useState('');
    const [jwt, setJwt] = useState('');

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
                username: "Martin", 
                password:  "1234"
            })
        })

        console.log(response)
        // if ok - save to localStorage and store

        // if not, send error
    }

    async function register(inputUsername: string, inputPassword: string) {
        // try sending REST request

        // possible errors = not unique / server error

        // login right after?
    }

    function logout() {
        // remove jwt from localstorage and store
    }


    return {
        username,
        jwt,
        login,
        logout,
        register
    }
}