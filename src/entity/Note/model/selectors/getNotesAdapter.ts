import {StateSchema} from 'app/StoreProvider'

import {noteAdapter, noteSliceName} from '../slices/NoteSlice'

export const getNotesAdapter = noteAdapter.getSelectors<StateSchema>(
    (state) => state[noteSliceName] || noteAdapter.getInitialState()
)