import {StateSchema} from 'app/StoreProvider'
import {noteSliceName} from 'entity/Note'

export const getNoteDownloadLimit = (state: StateSchema) => state[noteSliceName].downloadLimit