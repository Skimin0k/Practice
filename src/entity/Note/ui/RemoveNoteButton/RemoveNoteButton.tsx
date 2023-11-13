import React, {memo, ReactNode, useCallback} from 'react'
import {useAppDispatch} from 'app/StoreProvider'
import {removeNote} from 'entity/Note/model/services/removeNote'
import {NoteType} from 'entity/Note/model/types/types'
import classNames from 'shared/lib/classNames/classNames'
import {Button} from 'shared/ui/Button/Button'

import styles from './RemoveNoteButton.module.scss'

interface RemoveNoteButtonProps {
    className?: string,
    id?: NoteType['id'],
    children: ReactNode
}

export const RemoveNoteButton = memo((props: RemoveNoteButtonProps) => {
    const {
        className,
        id,
        children
    } = props
    const dispatch = useAppDispatch()
    const onClickHandler = useCallback(() => {
        if (id) dispatch(removeNote(id))
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