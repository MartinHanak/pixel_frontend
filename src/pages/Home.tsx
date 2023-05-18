import { NewGame } from "../components/NewGame"
import { Placeholder } from "../components/Placeholder"

export default function Home() {
    return (
        <>
            <h1>Intro Header</h1>
            <p>Blok of text</p>
            <Placeholder></Placeholder>
            <NewGame />
        </>
    )
}