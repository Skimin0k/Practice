import React, {memo, useCallback} from 'react'

import styles from './Input.module.scss'

export interface InputType extends Omit<React.InputHTMLAttributes<HTMLInputElement>,'onChange'>{
    onChange: (value: string) => void
}

const InputWithoutMemo = (props: InputType) => {
    const {onChange, ...rest } = props
    const onChangeHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
        onChange(event.target.value)
    }, [onChange]) 
    return <input
        onChange={onChangeHandler}
        {...rest}
        className={styles.Input}
    />
}

export const Input = memo(InputWithoutMemo) as typeof InputWithoutMemo