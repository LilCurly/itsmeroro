import SectionTypes from './section.types';

const INITIAL_STATE = {
    currentSection: 'brainstorming',
}

const sectionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SectionTypes.CHANGE_CURRENT_SECTION:
            return {
                ...state,
                currentSection: action.payload
            }
        default:
            return state;
    }
}

export default sectionReducer;