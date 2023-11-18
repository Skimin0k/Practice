import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'

import {getNoteHasMore} from '../selectors/getNoteHasMore'
import {getNoteIsLoading} from '../selectors/getNoteIsLoading'
import {getNotePage} from '../selectors/getNotePage'
import {noteListSliceName} from '../slices/NoteListSlice'

import {fetchNotes} from './fetchNotes'

export const fetchNewPageNotes =
    createAsyncThunk<void, void, ThunkApi<string>>
    (`${noteListSliceName}/fetchNewPageNotes`,async (args, thunkAPI) => {
        const {
            rejectWithValue,
            getState,
            dispatch
        } = thunkAPI

        try {
            const hasMore = getNoteHasMore(getState())
            const isNoteListLoading = getNoteIsLoading(getState())
            const page = getNotePage(getState())

            if(hasMore && !isNoteListLoading){
                dispatch(fetchNotes({
                    _page: page + 1
                }))
            }
        } catch (e) {
            return rejectWithValue('fetch notes failed')
        }
    })