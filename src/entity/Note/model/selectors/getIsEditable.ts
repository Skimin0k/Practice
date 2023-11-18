import {StateSchema} from 'app/StoreProvider'

import {draftNoteSliceName} from '../slices/DraftNoteSlice'

export const getIsEditable = (state: StateSchema) => state[draftNoteSliceName].isEditable