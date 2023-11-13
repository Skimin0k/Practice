import React, { memo, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import {getNoteDraft, noteActions} from 'entity/Note'
import {CreateNewNotButton} from 'entity/Note/ui/CreateNewNotButton/CreateNewNotButton'
import {RemoveNoteButton} from 'entity/Note/ui/RemoveNoteButton/RemoveNoteButton'
import {ResetDraftButton} from 'entity/Note/ui/ResetDraftButton/ResetDraftButton'
import {SaveDraftButton} from 'entity/Note/ui/SaveDraftButton/SaveDraftButton'
import classNames from 'shared/lib/classNames/classNames'
import {DebouncedInput} from 'shared/ui/DebouncedInput/DebouncedInput'

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
        dispatch(noteActions.updateDraftValue({
            header: value
        }))
    }, [dispatch])

    const changeContentHandler = useCallback((value) => {
        dispatch(noteActions.updateDraftValue({
            content: value
        }))
    }, [dispatch])

    // if(draft === undefined) {
    //     return <div
    //         className={classNames(styles.NoteEditor, {}, [className])}
    //     >
    //         ни один элемент еще не выбран
    //     </div>
    // }

    return (
        <div
            className={classNames(styles.NoteEditor, {}, [className])}
        >
            <CreateNewNotButton>Create</CreateNewNotButton>
            <SaveDraftButton>Save</SaveDraftButton>
            <ResetDraftButton>Reset</ResetDraftButton>
            <RemoveNoteButton id={draft?.id}>Delete</RemoveNoteButton>
            <div>
                <DebouncedInput
                    placeholder={'header'}
                    onChange={changeHeaderHandler}
                    value={draft?.header || ''}
                    disabled={draft?.header === undefined}
                    delay={400}
                />
            </div>
            <div>
                <DebouncedInput
                    placeholder={'content'}
                    onChange={changeContentHandler}
                    value={draft?.content || ''}
                    disabled={draft?.header === undefined}
                    delay={400}
                />
            </div>
        </div>
    )
})