import React, {memo, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import { getNotesAdapter, noteActions} from 'entity/Note'
import {fetchNewPageNotes} from 'entity/Note/model/services/fetchNewPageNotes'
import {NoteType} from 'entity/Note/model/types/types'
import {MiniCard} from 'entity/Note/ui/MiniCard/MiniCard'
import {RemoveNoteButton} from 'entity/Note/ui/RemoveNoteButton/RemoveNoteButton'
import {InfiniteList} from 'shared/ui/InfiniteList/InfiniteList'

import styles from './NoteList.module.scss'

interface NoteListProps {
    className?: string
}

export const NoteList = memo((props: NoteListProps) => {
    const {
        className
    } = props

    const notes = useSelector(getNotesAdapter.selectAll)

    const dispatch = useAppDispatch()

    const selectNote = useCallback((id: NoteType['id']) => {
        dispatch(noteActions.setDraftNoteById(id))
    }, [dispatch])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onScrollEnd = useCallback(() => {
        dispatch(fetchNewPageNotes({}))
    }, [dispatch])

    return <InfiniteList
        data={notes}
        renderElement={(note) => <div
            onClick={() => {
                selectNote(note.id)
            }}
            className={styles.NoteListItem}
            key={note.id}
        >
            <MiniCard data={note}/>
            <RemoveNoteButton id={note.id} className={styles.removeButton}>-</RemoveNoteButton>
        </div>}
        hasMore={false}
        onScrollEnd={onScrollEnd}
        className={styles.InfiniteList}
    />
})