import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {fetchNotes} from 'entity/Note'
import {getNoteHasMore} from 'entity/Note/model/selectors/getNoteHasMore'

export interface fetchNotesProps {
    replace?:boolean
}

export const fetchNewPageNotes =
    createAsyncThunk<void, fetchNotesProps, ThunkApi<string>>
    ('note/fetchNewPageNotes',async (args, thunkAPI) => {
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