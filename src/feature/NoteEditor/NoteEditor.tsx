import React, { memo, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import {draftNoteActions, getNoteDraft, removeNote, resetDraft, saveDraft} from 'entity/Note'
import {getIsEditable} from 'entity/Note/model/selectors/getIsEditable'
import classNames from 'shared/lib/classNames/classNames'
import {Button} from 'shared/ui/Button/Button'
import {DebouncedInput} from 'shared/ui/DebouncedInput/DebouncedInput'
import {DebouncedTextArea} from 'shared/ui/DebouncedTextArea/DebouncedTextArea'

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
    const editOnClick = useCallback(() => {
        dispatch(draftNoteActions.setEditable(true))
    }, [dispatch])
    const isEditable = useSelector(getIsEditable)
    return (
        <div
            className={classNames(styles.NoteEditor, {}, [className])}
        >
            <Button
                onClick={editOnClick}
                disabled={isEditable}
            >
                Edit
            </Button>
            <div>
                <Button
                    onClick={onClickSaveButtonHandler}
                    disabled={!isEditable}
                >
                    Save
                </Button>
                <Button
                    onClick={onClickResetButtonHandler}
                    disabled={!isEditable}
                >
                    Reset
                </Button>
                <Button
                    onClick={onClickRemoveButtonHandler}
                    disabled={!isEditable || draft?.id === undefined}
                >
                    Remove
                </Button>

            </div>
            <div>
                <DebouncedInput
                    placeholder={'header'}
                    onChange={changeHeaderHandler}
                    value={draft?.header || ''}
                    disabled={draft?.header === undefined || !isEditable}
                    delay={250}
                />
            </div>
            <div>
                <DebouncedTextArea
                    placeholder={'content'}
                    onChange={changeContentHandler}
                    value={draft?.content || ''}
                    disabled={draft?.header === undefined || !isEditable}
                    delay={250}
                />
            </div>
        </div>
    )
})