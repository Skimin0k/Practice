import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'

import {getNoteHasMore} from '../selectors/getNoteHasMore'
import {noteListSliceName} from '../slices/NoteListSlice'

import {fetchNotes} from './fetchNotes'

export interface fetchNotesProps {
    replace?:boolean
}

export const fetchNewPageNotes =
    createAsyncThunk<void, fetchNotesProps, ThunkApi<string>>
    (`${noteListSliceName}/fetchNewPageNotes`,async (args, thunkAPI) => {
        const {
            rejectWithValue,
            getState,
            dispatch
        } = thunkAPI
        const {
            replace
        } = args

        try {
            const hasMore = getNoteHasMore(getState())
            if(hasMore){
                dispatch(fetchNotes({
                    replace
                }))
            }
        } catch (e) {
            return rejectWithValue('fetch notes failed')
        }
    })