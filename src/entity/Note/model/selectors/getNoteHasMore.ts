import {StateSchema} from 'app/StoreProvider'

import {noteListSliceName} from '../slices/NoteListSlice'

export const getNoteHasMore = (state: StateSchema) => state[noteListSliceName].hasMore