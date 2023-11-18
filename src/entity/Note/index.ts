export {getNoteDraft} from './model/selectors/getNoteDraft'
export {fetchNewPageNotes} from './model/services/fetchNewPageNotes'
export {removeNote} from './model/services/removeNote'
export {resetDraft} from './model/services/resetDraft'
export {saveDraft} from './model/services/saveDraft'
export {
    draftNoteActions,
    draftNoteReducer,
    draftNoteSliceName
} from './model/slices/DraftNoteSlice'
export {
    noteListActions,
    noteListReducer,
    noteListSelectors,
    noteListSliceName} from './model/slices/NoteListSlice'
export type {NoteType} from './model/types/types'
export {MiniCard} from './ui/MiniCard/MiniCard'