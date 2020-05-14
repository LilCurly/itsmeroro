import NotesTypes from './notes.types';

export const loadNotes = payload => ({
    type: NotesTypes.LOAD_NOTES,
    payload
})

export const changeCurrentNote = payload => ({
    type: NotesTypes.CHANGE_CURRENT_NOTE,
    payload
})