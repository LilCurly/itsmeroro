import BrainstormingTypes from './brainstorming.types';

const INITIAL_STATE = {
    subjects: {},
    messages: {},
    currentSubject: '',
    loading: false
}

const BrainstormingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BrainstormingTypes.LOAD_SUBJECTS:
            return {
                ...state,
                subjects: {...action.payload}
            }
        case BrainstormingTypes.CHANGE_CURRENT_SUBJECT:
            return {
                ...state,
                currentSubject: action.payload
            }
        case BrainstormingTypes.LOAD_MESSAGES:
            return {
                ...state,
                messages: {...action.payload}
            }
        case BrainstormingTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case BrainstormingTypes.UPDATE_SUBJECT:
            return {
                ...state,
                currentSubject: {
                    ...state.currentSubject,
                    nbrMessage: action.payload.nbrMessage,
                    updatedAt: action.payload.updatedAt
                }
            }
        default:
            return state
    }
}

export default BrainstormingReducer;