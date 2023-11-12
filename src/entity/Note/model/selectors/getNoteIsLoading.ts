import {StateSchema} from 'app/StoreProvider'

import {noteSliceName} from '../slices/NoteSlice'

export const getNoteIsLoading = (state: StateSchema) => state[noteSliceName].isLoading