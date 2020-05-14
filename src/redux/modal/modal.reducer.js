import ModalTypes from './modal.types';

const INITIAL_STATE = {
    createBrainstorming: false,
    sendMessage: false,
    portfolio: false,
    notes: false
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
        default:
            return state;
    }
}

export default ModalReducer;