import React, {memo, useCallback, useEffect, useState} from 'react'
import {useDebounce} from 'shared/lib/hooks/useDebounce/useDebounce'

interface DebouncedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>,'onChange' | 'value'> {
    className?: string,
    value: string,
    onChange: (value: string) => void,
    delay: number
}

export const DebouncedInput = memo((props: DebouncedInputProps) => {
    const {
        value,
        onChange,
        delay,
        ...rest
    } = props
    const [state, setState] = useState(value)
    useEffect(() => {
        console.log(value)
        setState(value)
    }, [value])
    const debouncedOnChange = useDebounce(onChange, delay)
    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setState(event.target.value)
        debouncedOnChange(state)
    }, [debouncedOnChange, state])
    
    return (
        <input
            {...rest}
            onChange={onChangeHandler}
            value={state}
        />
    )
})