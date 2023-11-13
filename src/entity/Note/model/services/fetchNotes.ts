import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'

import {NoteType} from '../types/types'

export const fetchNotes =
    createAsyncThunk<NoteType[], void, ThunkApi<string>>
    ('note/fetchNotes',async (_, thunkAPI) => {
        const {
            rejectWithValue,
            extra: {
                api
            }
        } = thunkAPI
        try {
            const notes = await api.get<NoteType[]>('http://localhost:3001/notes')
            return notes.data
        } catch (e) {
            return rejectWithValue('fetch notes failed')
        }
    })