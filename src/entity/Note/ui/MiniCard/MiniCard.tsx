import React, {memo} from 'react'
import classNames from 'shared/lib/classNames/classNames'

import {NoteType} from '../../model/types/types'

import styles from './MiniCard.module.scss'

interface MiniCardProps{
    className?: string
    data: NoteType
}

export const MiniCard = memo((props: MiniCardProps) => {
    const {
        className,
        data: {
            header,
            content,
            id
        }
    } = props
    return (
        <div
            className={classNames(styles.MiniCard, {}, [className])}
        >
            <h4>{header} {id}</h4>
            <div>{content}</div>
        </div>
    )
})