import {useCallback, useRef} from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timeout = useRef()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useCallback((...args: any[]) => {
        if(timeout.current) {
            clearTimeout(timeout.current)
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        timeout.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay])
}