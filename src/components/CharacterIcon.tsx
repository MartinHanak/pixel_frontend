interface CharacterIcon {
    imageSrc: string,
    small?: boolean
}

export function CharacterIcon({ imageSrc, small = false }: CharacterIcon) {
    return (
        <div style={{ backgroundImage: `url(${imageSrc})` }}
            className={`${small ? "w-16 h-16" : "w-20 h-20 mt-4 sm:mt-0 sm:w-32 sm:h-32"} bg-cover rounded-full flex-shrink-0`}
        >
        </div>
    )
}