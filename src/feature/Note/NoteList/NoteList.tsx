import React, {memo, useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import {fetchNotes, getNoteIsLoading, getNotesAdapter, noteActions} from 'entity/Note'
import {NoteType} from 'entity/Note/model/types/types'
import {MiniCard} from 'entity/Note/ui/MiniCard/MiniCard'
import {List} from 'shared/ui/List/List'

interface NoteListProps {
    className?: string
}

export const NoteList = memo((props: NoteListProps) => {
    const {
        className
    } = props

    const notes = useSelector(getNotesAdapter.selectAll)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchNotes())
    }, [dispatch])

    const notesIsLoading = useSelector(getNoteIsLoading)

    const selectNote = useCallback((id: NoteType['id']) => {
        dispatch(noteActions.setDraftNoteById(id))
    }, [dispatch])
    
    if (notesIsLoading) {
        return <div>
            {notesIsLoading && <div>notes is loading...</div>}
        </div>
    }

    return <List
        data={notes}
        renderElement={(note) => <div
            onClick={() => {
                selectNote(note.id)
            }}
        >

            <MiniCard key={note.id} data={note}/>
        </div>
        }
    />
})