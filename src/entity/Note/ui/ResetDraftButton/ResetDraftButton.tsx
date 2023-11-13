import React, {memo, ReactNode, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import {getNoteDraft, noteActions} from 'entity/Note'
import classNames from 'shared/lib/classNames/classNames'
import {Button} from 'shared/ui/Button/Button'

import styles from './ResetDraftButton.module.scss'

interface ResetDraftButtonProps {
    className?: string,
    children: ReactNode
}

export const ResetDraftButton = memo((props: ResetDraftButtonProps) => {
    const {
        className,
        children
    } = props
    const dispatch = useAppDispatch()
    const draft = useSelector(getNoteDraft)
    const onClickHandler = useCallback(() => {
        if(draft?.id){
            dispatch(noteActions.setDraftNoteById(draft.id))
        }
    }, [dispatch, draft])
    return (
        <Button
            className={classNames(styles.ResetDraftButton, {}, [className])}
            onClick={onClickHandler}
        >
            {children}
        </Button>
    )
})