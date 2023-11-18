import {createEntityAdapter, createSlice, EntityState, PayloadAction} from '@reduxjs/toolkit'
import {StateSchema} from 'app/StoreProvider'

import {fetchNotes} from '../services/fetchNotes'
import {removeNote} from '../services/removeNote'
import {NoteType} from '../types/types'

export interface NoteSliceStateSchema extends EntityState<NoteType>{
   isLoading: boolean;
   error?: string;
   hasMore: boolean;
   page: number;
   downloadLimit: number
}

export const noteAdapter = createEntityAdapter<NoteType>({
    selectId: (note) => note.id
})

const NoteListSlice = createSlice({
    name: 'noteList',
    initialState: noteAdapter.getInitialState<NoteSliceStateSchema>({
        ids: [],
        entities: {},
        isLoading: false,
        hasMore: true,
        page: 1,
        downloadLimit: 3
    }),
    reducers: {
        setOne:(state, action: PayloadAction<NoteType>) => {
            noteAdapter.setOne(state, action.payload)
        }
    },
    extraReducers: builder => {

        builder.addCase(fetchNotes.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchNotes.fulfilled, (state, action) => {
            state.isLoading = false
            if(action.payload.length){
                if(action.meta.arg?.replace){
                    noteAdapter.setAll(state, action.payload)
                    state.page = 1
                } else {
                    noteAdapter.addMany(state, action.payload)
                    state.page++
                }
            }
            state.hasMore = action.payload.length > 0
        })
        builder.addCase(fetchNotes.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        builder.addCase(removeNote.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(removeNote.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(removeNote.fulfilled, (state, action) => {
            state.isLoading = false
            noteAdapter.removeOne(state, action.payload)
        })
    }
})

export const noteListSelectors = noteAdapter.getSelectors<StateSchema>(
    (state) => state?.[noteListSliceName] || noteAdapter.getInitialState()
)

export const {
    reducer: noteListReducer,
    actions: noteListActions,
    name: noteListSliceName
} = NoteListSlice
