interface CharacterIcon {
    imageSrc: string
}

export function CharacterIcon({ imageSrc }: CharacterIcon) {
    return (
        <div style={{ backgroundImage: `url(${imageSrc})` }}
            className="bg-cover w-32 h-32 rounded-full">
        </div>
    )
}