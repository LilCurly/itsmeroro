import ModalTypes from './modal.types';

const INITIAL_STATE = {
    createBrainstorming: false,
    sendMessage: false,
    portfolio: false,
    notes: false,
    notesModify: false,
    portfolioModify: false
}

const ModalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ModalTypes.TOGGLE_CREATE_BRAINSTORMING:
            return {
                ...state,
                createBrainstorming: !state.createBrainstorming
            }
        case ModalTypes.TOGGLE_SEND_MESSAGE:
            return {
                ...state,
                sendMessage: !state.sendMessage
            }
        case ModalTypes.TOGGLE_PORTFOLIO_MODAL:
            return {
                ...state,
                portfolio: !state.portfolio
            }
        case ModalTypes.TOGGLE_NOTES_MODAL:
            return {
                ...state,
                notes: !state.notes
            }
        case ModalTypes.TOGGLE_NOTES_MODIFY:
            return {
                ...state,
                notesModify: !state.notesModify
            }
        case ModalTypes.TOGGLE_PORTFOLIO_MODIFY:
            return {
                ...state,
                portfolioModify: !state.portfolioModify
            }
        default:
            return state;
    }
}

export default ModalReducer;