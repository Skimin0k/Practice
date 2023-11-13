import React, {memo, ReactNode, useCallback} from 'react'
import {useAppDispatch} from 'app/StoreProvider'
import { noteActions} from 'entity/Note'
import {NoteType} from 'entity/Note/model/types/types'
import classNames from 'shared/lib/classNames/classNames'
import {Button} from 'shared/ui/Button/Button'

import styles from './ResetDraftButton.module.scss'

interface ResetDraftButtonProps {
    className?: string,
    children: ReactNode,
    id?: NoteType['id']
}

export const ResetDraftButton = memo((props: ResetDraftButtonProps) => {
    const {
        className,
        children,
        id
    } = props
    const dispatch = useAppDispatch()
    const onClickHandler = useCallback(() => {
        if(id) dispatch(noteActions.setDraftNoteById(id))
    }, [dispatch, id])
    return (
        <Button
            className={classNames(styles.ResetDraftButton, {}, [className])}
            onClick={onClickHandler}
            disabled={id === undefined}
        >
            {children}
        </Button>
    )
})