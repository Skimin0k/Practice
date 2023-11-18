import {StateSchema} from 'app/StoreProvider'

import {noteListSliceName} from '../slices/NoteListSlice'

export const getNotePage = (state: StateSchema) => state[noteListSliceName].page