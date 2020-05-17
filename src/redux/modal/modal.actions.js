import ModalTypes from './modal.types';

export const toggleSendMessage = () => ({
    type: ModalTypes.TOGGLE_SEND_MESSAGE
})

export const toggleCreateBrainstorming = () => ({
    type: ModalTypes.TOGGLE_CREATE_BRAINSTORMING
})

export const togglePortfolioModal = () => ({
    type: ModalTypes.TOGGLE_PORTFOLIO_MODAL
})

export const toggleNotesModal = () => ({
    type: ModalTypes.TOGGLE_NOTES_MODAL
})

export const toggleNotesModify = () => ({
    type: ModalTypes.TOGGLE_NOTES_MODIFY
})

export const togglePortfolioModify = () => ({
    type: ModalTypes.TOGGLE_PORTFOLIO_MODIFY
})