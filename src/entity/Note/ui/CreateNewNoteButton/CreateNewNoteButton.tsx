import React, {memo, ReactNode, useCallback} from 'react'
import {useAppDispatch} from 'app/StoreProvider'
import {createNote} from 'entity/Note/model/services/createNote'
import classNames from 'shared/lib/classNames/classNames'
import {Button} from 'shared/ui/Button/Button'

import styles from './CreateNewNoteButton.module.scss'

interface CreateNewNotButtonProps {
    className?: string,
    children: ReactNode
}

export const CreateNewNoteButton = memo((props: CreateNewNotButtonProps) => {
    const {
        className,
        children
    } = props
    const dispatch = useAppDispatch()
    const onClickHandler = useCallback(() => {
        dispatch(createNote())
    }, [dispatch])
    return (
        <Button
            className={classNames(styles.CreateNewNotButton, {}, [className])}
            onClick={onClickHandler}
        >
            {children}
        </Button>
    )
})