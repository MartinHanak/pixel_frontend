import { useEffect, useState } from "react";
import { BACKEND_URL } from '../utils/config'
import { useAppSelector } from "./typedStoreHooks";
import fetchWithCredentials from "../utils/fetchWithCredentials";

interface game {
    id: number,
    theme: string
}

export default function useGames() {
        const jwt = useAppSelector((state) => state.login.jwt) 


        const [isLoading, setIsLoading ] = useState(false);
        const [games,setGames] = useState<game[]>([]);


        useEffect( () => {

            const controller = new AbortController();
            setIsLoading(true);

            (async () => {

                const gamesResponse = await fetchWithCredentials(
                    `${BACKEND_URL}/api/game`,
                    jwt,
                    {signal: controller.signal}
                )

                const gamesJSON = await gamesResponse.json();

                const gamesDisplayInfo = gamesJSON.games.map((gameServerInfo: any) => {
                    if(gameServerInfo.id && (gameServerInfo.theme || gameServerInfo.theme === null)) {
                        return {
                            id: gameServerInfo.id,
                            theme: gameServerInfo.theme
                        }
                    } else {
                        return null
                    }
                })

                setGames(gamesDisplayInfo)


                

                setIsLoading(false);
            })()

            return () => {
                controller.abort();
            }

        }, [])


        return {
            isLoading,
            games
        }
}