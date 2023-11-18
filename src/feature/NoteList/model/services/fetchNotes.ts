import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {getNoteDownloadLimit, NoteType} from 'entity/Note'
import {getFiltersOrder} from 'feature/NoteList'

import {getSearchInput} from '../selectors/getSearchInput'

export interface fetchNotesProps {
    replace?:boolean,
    _page?: number
}

export const fetchNotes =
    createAsyncThunk<NoteType[], fetchNotesProps, ThunkApi<string>>
    ('notesList/fetchNotes',async (args, thunkAPI) => {
        const {
            rejectWithValue,
            getState,
            extra: {
                api
            }
        } = thunkAPI
        try {
            const {
                _page = 1
            } = args
            const _limit = getNoteDownloadLimit(getState())
            const _search = getSearchInput(getState())
            const _order = getFiltersOrder(getState())

            const notes = await api.get<NoteType[]>('http://localhost:3001/notes',{
                params: {
                    _page,
                    _limit,
                    q: _search,
                    _sort:'createdAt',
                    _order
                }
            })
            return notes.data
        } catch (e) {
            return rejectWithValue('fetch notes failed')
        }
    })

// todo is not loading for all fetches