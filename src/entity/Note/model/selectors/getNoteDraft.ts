import {StateSchema} from 'app/StoreProvider'
import {noteSliceName} from 'entity/Note'

export const getNoteDraft = (state: StateSchema) => state[noteSliceName].draft