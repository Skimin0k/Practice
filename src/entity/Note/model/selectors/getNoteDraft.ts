import {StateSchema} from 'app/StoreProvider'

import {draftNoteSliceName} from '../slices/DraftNoteSlice'

export const getNoteDraft = (state: StateSchema) => state[draftNoteSliceName]?.draft