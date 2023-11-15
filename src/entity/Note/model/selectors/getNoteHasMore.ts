import {StateSchema} from 'app/StoreProvider'
import {noteSliceName} from 'entity/Note'

export const getNoteHasMore = (state: StateSchema) => state[noteSliceName].hasMore