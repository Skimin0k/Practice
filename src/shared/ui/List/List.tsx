import React, {ReactNode} from 'react'
import classNames from 'shared/lib/classNames/classNames'

import styles from './List.module.scss'

export interface ListProps<T> {
    className?: string,
    data: T[],
    renderElement: (element: T) => ReactNode,
}

export const List = <T extends object>(props: ListProps<T>) => {
    const {
        className,
        data,
        renderElement
    } = props
    return (
        <div
            className={classNames(styles.List, {}, [className])}
        >
            {data.map(renderElement)}
        </div>
    )
}