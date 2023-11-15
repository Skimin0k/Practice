import {StateSchema} from 'app/StoreProvider'
import {noteSliceName} from 'entity/Note'

export const getNotePage = (state: StateSchema) => state[noteSliceName].page