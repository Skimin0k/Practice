import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export enum Order {
    DESK='desc',
    ASC='asc'
}
export interface FiltersSliceStateSchema{
    search: string,
    order: Order
}
const initialState : FiltersSliceStateSchema = {
    search: '',
    order: Order.DESK
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
