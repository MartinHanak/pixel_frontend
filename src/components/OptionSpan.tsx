interface OptionSpan {
    children: React.ReactNode
}

export function OptionSpan({ children }: OptionSpan) {
    return (
        <span className="text-orange-500 pr-4">
            {children}
        </span>
    )
}