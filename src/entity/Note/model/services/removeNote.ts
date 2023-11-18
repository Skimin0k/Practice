import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'

import {noteListSliceName} from '../slices/NoteListSlice'
import {NoteType} from '../types/types'

export const removeNote =
    createAsyncThunk<NoteType['id'], NoteType['id'] | undefined, ThunkApi<string>>
    (`${noteListSliceName}/removeNote`,async (id, thunkAPI) => {
        const {
            rejectWithValue,
            extra: {
                api
            }
        } = thunkAPI

        try {
            if(id){
                await api.delete('http://localhost:3001/notes/' + id)
                return id
            }
            return rejectWithValue('there is no id in note')
        } catch (e) {
            return rejectWithValue('save data failed')
        }
    })