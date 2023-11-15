import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'
import {getNoteDownloadLimit} from 'entity/Note/model/selectors/getNoteDownloadLimit'
import {getNotePage} from 'entity/Note/model/selectors/getNotePage'

import {NoteType} from '../types/types'

export interface fetchNotesProps {
    replace?:boolean,
}

export const fetchNotes =
    createAsyncThunk<NoteType[], fetchNotesProps | undefined, ThunkApi<string>>
    ('note/fetchNotes',async (_, thunkAPI) => {
        const {
            rejectWithValue,
            getState,
            extra: {
                api
            }
        } = thunkAPI
        try {
            const _page = getNotePage(getState())
            const _limit = getNoteDownloadLimit(getState())

            const notes = await api.get<NoteType[]>('http://localhost:3001/notes',{
                params: {
                    _page,
                    _limit
                }
            })
            return notes.data
        } catch (e) {
            return rejectWithValue('fetch notes failed')
        }
    })