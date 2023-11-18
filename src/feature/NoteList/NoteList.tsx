import React, {memo, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import {draftNoteActions, fetchNewPageNotes, MiniCard, noteListSelectors, NoteType} from 'entity/Note'
import {InfiniteList} from 'shared/ui/InfiniteList/InfiniteList'

import styles from './NoteList.module.scss'

interface NoteListProps {
    className?: string
}

export const NoteList = memo((props: NoteListProps) => {
    const {
        className
    } = props

    const notes = useSelector(noteListSelectors.selectAll)

    const dispatch = useAppDispatch()

    const selectNote = useCallback((note: NoteType) => {
        dispatch(draftNoteActions.updateDraftValue(note))
    }, [dispatch])

    const onScrollEnd = useCallback(() => {
        dispatch(fetchNewPageNotes())
    }, [dispatch])

    return <InfiniteList
        data={notes}
        renderElement={(note) => <div
            onClick={() => {
                selectNote(note)
            }}
            className={styles.NoteListItem}
            key={note.id}
        >
            <MiniCard data={note}/>
        </div>}
        hasMore={false}
        onScrollEnd={onScrollEnd}
        className={styles.InfiniteList}
    />
})