import PlaceholderLoading from "react-placeholder-loading"

interface Placeholder {
    dark?: boolean
}

export function Placeholder({ dark }: Placeholder) {
    return (
        <div className="inline-block w-12 h-6">
            <svg viewBox="0 0 21 10" xmlns="http://www.w3.org/2000/svg">
                <circle className="animate-delay-bounce " cx="3.5" cy="7.5" r="2" fill={dark ? 'black' : 'white'} />
                <circle style={{ animationDelay: '100ms' }} className="animate-delay-bounce " cx="10.5" cy="7.5" r="2" fill={dark ? 'black' : 'white'} />
                <circle style={{ animationDelay: '200ms' }} className="animate-delay-bounce delay-1000" cx="17.5" cy="7.5" r="2" fill={dark ? 'black' : 'white'} />
            </svg>
        </div>
    )
}