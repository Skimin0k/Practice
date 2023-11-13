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
            const draft = getNoteDraft(getState())

            if(draft?.id) {
                // await api.patch('', draft)
            } else {
                // const newNote = api.post('', draft)
            }

            return draft as NoteType

        } catch (e) {
            return rejectWithValue('save data failed')
        }
    })