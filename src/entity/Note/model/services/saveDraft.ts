import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'

import {getNoteDraft} from '../selectors/getNoteDraft'
import {draftNoteSliceName} from '../slices/DraftNoteSlice'
import {noteListActions} from '../slices/NoteListSlice'
import {NoteType} from '../types/types'

export const saveDraft =
    createAsyncThunk<NoteType, void, ThunkApi<string>>
    (`${draftNoteSliceName}/save`,async (_, thunkAPI) => {
        const {
            rejectWithValue,
            getState,
            dispatch,
            extra: {
                api
            }
        } = thunkAPI

        try {
            let draft = getNoteDraft(getState())

            if(draft?.id) {
                await api.patch('http://localhost:3001/notes/' + draft.id, draft)
            } else {
                const response = await api.post<NoteType>('http://localhost:3001/notes', draft)
                draft = response.data
            }
            dispatch(noteListActions.setOne(draft as NoteType))
            return draft as NoteType

        } catch (e) {
            return rejectWithValue('save draft failed')
        }
    })