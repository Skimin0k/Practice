import React, {memo, useCallback} from 'react'
import {useAppDispatch} from 'app/StoreProvider'
import {createNote} from 'entity/Note/model/services/createNote'
import classNames from 'shared/lib/classNames/classNames'
import {Button} from 'shared/ui/Button/Button'

import styles from './CreateNewNotButton.module.scss'

interface CreateNewNotButtonProps {
    className?: string
}

export const CreateNewNotButton = memo((props: CreateNewNotButtonProps) => {
    const {
        className
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
            Create
        </Button>
    )
})