import React, {ChangeEventHandler, memo, useCallback, useMemo} from 'react'
import classNames from 'shared/lib/classNames/classNames'

import styles from './Select.module.scss'

export interface OptionType<T extends string> {
    name: string,
    content: T,
}
interface SelectProps<T extends string> {
    className?: string,
    disabled?: boolean,
    placeholder?: string,
    value: T,
    onChange: (value: T) => void,
    options: OptionType<T>[]
}

const SelectWithoutMemo =<T extends string>(props: SelectProps<T>) => {
    const {
        className,
        disabled = false,
        placeholder,
        onChange,
        options,
        value
    } = props

    const mods = {
        [styles.disabled]: disabled
    }

    const onChangeHandler: ChangeEventHandler<HTMLSelectElement> = useCallback((event) => {
        const newValue = event.target.value as T
        onChange(newValue)
    }, [onChange])

    const optionsElements = useMemo(() => {
        return options.map(({name, content}) => {
            return <option
                key={name}
                value={content}
                selected={value === content}
            >{name}</option>
        })
    }, [options, value])

    return (
        <select
            className={classNames(styles.Select, mods, [className])}
            placeholder={placeholder}
            onChange={onChangeHandler}
        >
            {optionsElements}
        </select>
    )
}

export const Select = memo(SelectWithoutMemo) as typeof SelectWithoutMemo