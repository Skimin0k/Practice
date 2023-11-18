import {StateSchema} from 'app/StoreProvider'

import {noteListSliceName} from '../slices/NoteListSlice'

export const getNoteIsLoading = (state: StateSchema) => state[noteListSliceName].isLoading