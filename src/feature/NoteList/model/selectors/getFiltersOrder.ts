import {StateSchema} from 'app/StoreProvider'

import {filtersNoteSliceName} from '../slices/FiltersSlice'

export const getFiltersOrder = (state: StateSchema) => state[filtersNoteSliceName].order