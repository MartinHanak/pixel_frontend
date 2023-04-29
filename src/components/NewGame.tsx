export function NewGame() {
    return (
        <div>
            <h2>New game</h2>
            <div>
                <label htmlFor="theme">Theme (optional)</label>
                <input type="text" id="theme" />
            </div>
            <button>Start new game</button>
        </div>
    )
}