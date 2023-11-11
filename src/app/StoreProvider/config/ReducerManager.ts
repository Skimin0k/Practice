import {CombinedState, combineReducers, ReducersMapObject} from '@reduxjs/toolkit'

import {ReducerManager, StateSchema, StateSchemaKey} from './StateSchema'

export function createReducerManager(initialReducers: ReducersMapObject<CombinedState<StateSchema>>): ReducerManager {
    const reducers = { ...initialReducers }
    let combinedReducer = combineReducers(reducers)
    let keysToRemove: StateSchemaKey[] = []

    return {
        getReducerMap: () => reducers,
        reduce: (state, action) => {
            if (keysToRemove.length > 0) {
                state = { ...state }
                for (const key of keysToRemove) {
                    delete state[key]
                }
                keysToRemove = []
            }
            return combinedReducer(state, action)
        },
        add: (key, reducer) => {
            if (!key || reducers[key]) {
                return
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            reducers[key] = reducer
            combinedReducer = combineReducers(reducers)
        },
        remove: key => {
            if (!key || !reducers[key]) {
                return
            }
            delete reducers[key]
            keysToRemove.push(key)
            combinedReducer = combineReducers(reducers)
        }
    }
}