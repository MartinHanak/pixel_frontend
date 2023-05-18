interface CharacterIcon {
    imageSrc: string,
    small?: boolean
}

export function CharacterIcon({ imageSrc, small = false }: CharacterIcon) {
    return (
        <div style={{ backgroundImage: `url(${imageSrc})` }}
            className={`${small ? "w-16 h-16" : "w-32 h-32"} bg-cover rounded-full flex-shrink-0`}
        >
        </div>
    )
}