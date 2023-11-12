import {createEntityAdapter, createSlice, EntityState} from '@reduxjs/toolkit'
import {fetchNotes} from 'entity/Note/model/services/fetchNotes'

import {NoteType} from '../types/types'

export interface NoteSliceStateSchema extends EntityState<NoteType>{
   isLoading: boolean;
   error?: string;
   draft?: Partial<NoteType>
}

export const noteAdapter = createEntityAdapter<NoteType>({
    selectId: (note) => note.id
})

const NoteSlice = createSlice({
    name: 'note',
    initialState: noteAdapter.getInitialState<NoteSliceStateSchema>({
        ids: [],
        entities: {},
        isLoading: false,
    }),
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchNotes.pending, (state) => {
            state.isLoading = true
            
        })
        builder.addCase(fetchNotes.fulfilled, (state, action) => {
            state.isLoading = false
            noteAdapter.setAll(state, action.payload)
        })
        builder.addCase(fetchNotes.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export const {
    reducer: noteReducer,
    actions: noteActions,
    name: noteSliceName
} = NoteSlice

// json-server
// todo: сделать бд
// todo: убрать заглушку с получения из бд
// todo: сделать создание новой записи в бд
// todo: сделать обновление существующей записи в бд

// draft
// todo создание
// todo обновление