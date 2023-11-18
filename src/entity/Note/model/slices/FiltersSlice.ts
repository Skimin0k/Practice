import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface FiltersSliceStateSchema{
    search: string
}
const initialState : FiltersSliceStateSchema = {
    search: ''
}
const FiltersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        updateFiltersValue: (state, action: PayloadAction<Partial<FiltersSliceStateSchema>>) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const {
    reducer: filtersNoteReducer,
    actions: filtersNoteAction,
    name: filtersNoteSliceName
} = FiltersSlice
