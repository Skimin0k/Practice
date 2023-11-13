import React, {memo, ReactNode, useCallback} from 'react'
import {useAppDispatch} from 'app/StoreProvider'
import {saveDraft} from 'entity/Note/model/services/saveDraft'
import classNames from 'shared/lib/classNames/classNames'
import {Button} from 'shared/ui/Button/Button'

import styles from './SaveDraftButton.module.scss'

interface SaveDraftButtonProps {
    className?: string,
    children: ReactNode
}

export const SaveDraftButton = memo((props: SaveDraftButtonProps) => {
    const {
        className, children
    } = props
    const dispatch = useAppDispatch()
    const clickHandler = useCallback(() => {
        dispatch(saveDraft())
    }, [dispatch])
    return (
        <Button
            className={classNames(styles.SaveDraftButton, {}, [className])}
            onClick={clickHandler}
        >
            {children}
        </Button>
    )
})