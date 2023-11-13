import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {NoteType} from 'entity/Note/model/types/types'

export const removeNote =
    createAsyncThunk<NoteType['id'], NoteType['id'], ThunkApi<string>>
    ('note/removeNote',async (id, thunkAPI) => {
        const {
            rejectWithValue,
            extra: {
                api
            }
        } = thunkAPI

        try {
            await api.delete('http://localhost:3001/notes/' + id)
            return id
        } catch (e) {
            return rejectWithValue('save data failed')
        }
    })