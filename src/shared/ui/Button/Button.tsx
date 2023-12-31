import React, {ButtonHTMLAttributes, memo, ReactNode} from 'react'
import classNames from 'shared/lib/classNames/classNames'

import styles from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string,
    children?: ReactNode
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        disabled = false,
        ...rest
    } = props

    const mods  = {
        [styles.disabled]: disabled
    }
    return (
        <button
            className={classNames(styles.Button, mods, [className])}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    )
})