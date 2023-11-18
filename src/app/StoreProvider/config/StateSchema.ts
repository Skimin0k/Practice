import {AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject} from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import {
    draftNoteSliceName,
    DraftNoteSliceStateSchema,
    filtersNoteSliceName,
    FiltersSliceStateSchema,
    noteListSliceName,
    NoteListSliceStateSchema
} from 'entity/Note'

export interface StateSchema {
    [noteListSliceName]: NoteListSliceStateSchema,
    [draftNoteSliceName]: DraftNoteSliceStateSchema,
    [filtersNoteSliceName]: FiltersSliceStateSchema
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