import useGames from "../hooks/useGames"

export default function GamesList() {
    const { isLoading, games } = useGames()

    return (
        <>
            <h1>Hello</h1>

            {isLoading ? 'Loading...' :
                <div>
                    {games.map((game) => {
                        return (
                            <div key={game.id}>
                                <h2>{game.id}</h2>
                                <p>theme: {game.theme}</p>
                            </div>)
                    })}
                </div>}

        </>
    )
}