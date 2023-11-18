import React, {memo, useCallback} from 'react'

import styles from './TextArea.module.scss'

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>,'onChange'>{
    onChange: (value: string) => void
}

const TextAreaWithoutMemo = (props: TextAreaProps) => {
    const {onChange, ...rest } = props
    const onChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement>  = useCallback((event) => {
        onChange(event.target.value)
    }, [onChange])
    return <textarea
        onChange={onChangeHandler}
        {...rest}
        className={styles.Input}
    />
}

export const TextArea = memo(TextAreaWithoutMemo) as typeof TextAreaWithoutMemo