import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {saveDraft} from '../services/saveDraft'
import {NoteType} from '../types/types'

export interface DraftNoteSliceStateSchema{
    isLoading: boolean;
    error?: string;
    draft?: Partial<NoteType>;
}
const initialState : DraftNoteSliceStateSchema = {
    isLoading: false,
    draft: {
        id: undefined,
        header: '',
        content: ''
    }
}
const DraftNoteSlice = createSlice({
    name: 'draftNote',
    initialState,
    reducers: {
        updateDraftValue: (state, action: PayloadAction<Partial<NoteType>>) => {
            state.draft = {
                ...state.draft,
                ...action.payload
            }
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
        builder.addCase(saveDraft.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(saveDraft.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(saveDraft.fulfilled, (state, action: PayloadAction<NoteType>) => {
            state.isLoading = false
            state.draft = action.payload
        })
    }
})

export const {
    reducer: draftNoteReducer,
    actions: draftNoteActions,
    name: draftNoteSliceName
} = DraftNoteSlice
