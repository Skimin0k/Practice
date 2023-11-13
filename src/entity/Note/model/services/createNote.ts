import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'

import {noteActions} from '../slices/NoteSlice'

export const createNote =
    createAsyncThunk<void, void, ThunkApi<string>>
    ('note/createNote',async (_, thunkAPI) => {
        const {
            rejectWithValue,
            dispatch,
            extra: {
                api
            }
        } = thunkAPI

        try {
            // const response = await api.post<NoteType>('http://localhost:3001/notes', noteTemplate)
            // return response.data
            dispatch(noteActions.setEmptyDraft())
        } catch (e) {
            return rejectWithValue('save data failed')
        }
    })