import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'

import {NoteType} from '../types/types'

const noteTemplate: Partial<NoteType> = {
    header: 'Новая заметка',
    content: 'пустое описание'
}

export const createNote =
    createAsyncThunk<NoteType, void, ThunkApi<string>>
    ('note/createNote',async (_, thunkAPI) => {
        const {
            rejectWithValue,
            extra: {
                api
            }
        } = thunkAPI

        try {
            const response = await api.post<NoteType>('http://localhost:3001/notes', noteTemplate)
            return response.data
        } catch (e) {
            return rejectWithValue('save data failed')
        }
    })