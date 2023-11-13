import {createEntityAdapter, createSlice, EntityState, PayloadAction} from '@reduxjs/toolkit'
import {fetchNotes} from 'entity/Note/model/services/fetchNotes'
import {removeNote} from 'entity/Note/model/services/removeNote'
import {saveDraft} from 'entity/Note/model/services/saveDraft'

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
    reducers: {
        updateDraftValue: (state, action: PayloadAction<Partial<NoteType>>) => {
            state.draft = {
                ...state.draft,
                ...action.payload
            }
        },
        setDraftNoteById: (state, action:PayloadAction<NoteType['id']>) => {
            state.draft = noteAdapter.getSelectors().selectById(state, action.payload)
        },
        updateExistingNoteById: (state, action) => {
            noteAdapter.updateOne(state, action.payload)
        },
        setEmptyDraft: (state) => {
            state.draft = {
                id: undefined,
                header: '',
                content: ''
            }
        }
    },
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

        builder.addCase(saveDraft.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(saveDraft.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(saveDraft.fulfilled, (state, action) => {
            state.isLoading = false
            noteAdapter.setOne(state, action.payload)
        })

        // builder.addCase(createNote.pending, (state) => {
        //     state.isLoading = true
        // })
        // builder.addCase(createNote.rejected, (state, action) => {
        //     state.isLoading = false
        //     state.error = action.payload
        // })
        // builder.addCase(createNote.fulfilled, (state, action) => {
        //     state.isLoading = false
        //     noteAdapter.setOne(state, action.payload)
        // })

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