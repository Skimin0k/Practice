import {StateSchema} from 'app/StoreProvider'

import {filtersNoteSliceName} from '../slices/FiltersSlice'

export const getSearchInput = (state: StateSchema) => state[filtersNoteSliceName].search