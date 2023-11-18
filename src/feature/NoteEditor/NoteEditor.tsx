import React, { memo, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import {draftNoteActions, getNoteDraft, removeNote, resetDraft, saveDraft} from 'entity/Note'
import classNames from 'shared/lib/classNames/classNames'
import {Button} from 'shared/ui/Button/Button'
import {Input} from 'shared/ui/Input/Input'

import styles from './NoteEditor.module.scss'

interface NoteEditorProps {
    className?: string
}

export const NoteEditor = memo((props: NoteEditorProps) => {
    const {
        className
    } = props
    const draft = useSelector(getNoteDraft)
    const dispatch = useAppDispatch()
    const changeHeaderHandler = useCallback((value) => {
        dispatch(draftNoteActions.updateDraftValue({
            header: value
        }))
    }, [dispatch])

    const changeContentHandler = useCallback((value) => {
        dispatch(draftNoteActions.updateDraftValue({
            content: value
        }))
    }, [dispatch])

    const onClickSaveButtonHandler = useCallback(() => {
        dispatch(saveDraft())
    }, [dispatch])

    const onClickResetButtonHandler = useCallback(() => {
        dispatch(resetDraft())
    }, [dispatch])
    
    const onClickRemoveButtonHandler = useCallback(() => {
        dispatch(removeNote(draft?.id))
    }, [dispatch, draft?.id])

    return (
        <div
            className={classNames(styles.NoteEditor, {}, [className])}
        >
            <Button
                onClick={onClickSaveButtonHandler}
            >
                Save
            </Button>
            <Button
                onClick={onClickResetButtonHandler}
            >
                Reset
            </Button>
            <Button onClick={onClickRemoveButtonHandler}>
                Remove
            </Button>
            <div>
                <Input
                    placeholder={'header'}
                    onChange={changeHeaderHandler}
                    value={draft?.header || ''}
                    disabled={draft?.header === undefined}
                />
            </div>
            <div>
                <Input
                    placeholder={'content'}
                    onChange={changeContentHandler}
                    value={draft?.content || ''}
                    disabled={draft?.header === undefined}
                />
            </div>
        </div>
    )
})