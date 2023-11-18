import {AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject} from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { NoteSliceStateSchema} from 'entity/Note'
import {draftNoteSliceName, DraftNoteSliceStateSchema} from 'entity/Note/model/slices/DraftNoteSlice'
import {noteListSliceName} from 'entity/Note/model/slices/NoteListSlice'

export interface StateSchema {
    [noteListSliceName]: NoteSliceStateSchema,
    [draftNoteSliceName]: DraftNoteSliceStateSchema
}

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>,
    add: (key: StateSchemaKey, reducer: Reducer) => void,
    remove: (key: StateSchemaKey) => void,
}
export type StateSchemaKey = keyof StateSchema

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema>{
    reducerManager: ReducerManager
}

export interface ThunkExtraArgs {
    api: AxiosInstance,
}
export interface ThunkApi<T> {
    rejectValue: T,
    extra: ThunkExtraArgs,
    state: StateSchema
}