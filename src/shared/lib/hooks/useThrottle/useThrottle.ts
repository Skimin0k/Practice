import {useCallback, useRef} from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useThrottle = (callback: (...args: any) => void, delay: number) => {
    const isCallable = useRef(true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useCallback((...args: any[]) => {
        if(isCallable.current) {
            callback(...args)
            isCallable.current = false

            setTimeout(() => {
                isCallable.current = true
            }, delay)
        }
    },[callback, delay])
}