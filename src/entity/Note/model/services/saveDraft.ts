import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {getNoteDraft} from 'entity/Note'

import {NoteType} from '../types/types'

export const saveDraft =
    createAsyncThunk<NoteType, void, ThunkApi<string>>
    ('note/saveDraft',async (_, thunkAPI) => {
        const {
            rejectWithValue,
            getState,
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
            return draft as NoteType

        } catch (e) {
            return rejectWithValue('save data failed')
        }
    })