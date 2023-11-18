import {StateSchema} from 'app/StoreProvider'

import {noteListSliceName} from '../slices/NoteListSlice'

export const getNoteDownloadLimit = (state: StateSchema) => state[noteListSliceName].downloadLimit