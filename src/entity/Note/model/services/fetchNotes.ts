import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkApi} from 'app/StoreProvider'

import {NoteType} from '../types/types'

export const fetchNotes =
    createAsyncThunk<NoteType[], void, ThunkApi<string>>
    ('note/fetchNotes',async (_, thunkAPI) => {
        const {
            rejectWithValue,
            extra: {
                api
            }
        } = thunkAPI
        try {
            const asyncFetchingData = async () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const notes: NoteType[] = [
                            {
                                id: '1',
                                header: 'заголовок',
                                content: 'какое-то описание'
                            },
                            {
                                id: '2',
                                header: 'заголовок',
                                content: 'какое-то описание'
                            },
                            {
                                id: '3',
                                header: 'заголовок',
                                content: 'какое-то описание'
                            },
                            {
                                id: '4',
                                header: 'заголовок',
                                content: 'какое-то описание'
                            },
                            {
                                id: '5',
                                header: 'заголовок',
                                content: 'какое-то описание'
                            },
                            {
                                id: '6',
                                header: 'заголовок',
                                content: 'какое-то описание'
                            },
                        ]
                        resolve(notes)
                    }, 1500)
                })
            }

            const result = await asyncFetchingData() as NoteType[]

            return result
        } catch (e) {
            return rejectWithValue('fetch notes failed')
        }
    })