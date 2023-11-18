import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'

import {getNoteDraft} from '../selectors/getNoteDraft'
import {draftNoteActions, draftNoteSliceName} from '../slices/DraftNoteSlice'
import { noteListSelectors} from '../slices/NoteListSlice'

export const resetDraft =
    createAsyncThunk<void, void, ThunkApi<string>>
    (`${draftNoteSliceName}/reset`,async (_, thunkAPI) => {
        const {
            rejectWithValue,
            getState,
            dispatch
        } = thunkAPI

        try {
            const draft = getNoteDraft(getState())
            if(draft?.id){
                const originNote = noteListSelectors.selectById(getState(), draft.id)
                if(originNote)
                    dispatch(draftNoteActions.updateDraftValue(originNote))
                else
                    return rejectWithValue('draft cannot be reseted')
            } else {
                dispatch(draftNoteActions.setEmptyDraft())
            }
        } catch (e) {
            return rejectWithValue('save draft failed')
        }
    })