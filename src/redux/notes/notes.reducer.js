import NotesTypes from './notes.types';

const INITIAL_STATE = {
    notes: {},
    currentNote: null
}

const NotesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NotesTypes.LOAD_NOTES:
            return {
                ...state,
                notes: action.payload
            }
        case NotesTypes.CHANGE_CURRENT_NOTE:
            return {
                ...state,
                currentNote: action.payload
            }
        default:
            return state;
    }
}

export default NotesReducer;