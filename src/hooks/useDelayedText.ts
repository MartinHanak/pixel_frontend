import { useState, useEffect, useRef } from "react"



export function useDelayedText(text : string) {

    const [words, setWords] = useState<string[]>([]);
    const lastWordUsedIndex = useRef<number|null>(null);

    const [displayedText, setDisplayedText] = useState('')

    const [finished, setFinished] = useState(false);

    useEffect(() => {

        setWords(text.split(""));
        lastWordUsedIndex.current = null;
        setFinished(false);

    },[text])

    useEffect(() => {
        if(words.length > 0) {
            lastWordUsedIndex.current = 0;
            setDisplayedText(words[0])
        }
    },[words.length])

    useEffect(() => {
        if(lastWordUsedIndex.current !== null && lastWordUsedIndex.current < words.length - 1) {
            setTimeout(() => {
                if(lastWordUsedIndex.current !== null) {
                    lastWordUsedIndex.current = lastWordUsedIndex.current + 1;
                    setDisplayedText((text:string) => { 
                        if(lastWordUsedIndex.current !== null) {
                            return`${text}${words[lastWordUsedIndex.current]}`
                        } else {
                            return text
                        } 
                    })
                }
            }, 40)
        }

        if(lastWordUsedIndex.current === words.length - 1) {
            setFinished(true)
        }
    },[displayedText])


    return [displayedText, finished];
} 