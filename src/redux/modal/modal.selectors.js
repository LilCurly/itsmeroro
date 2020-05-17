import { createSelector } from 'reselect';

const selectModal = state => state.modal;

export const selectMessageState = createSelector(
    [selectModal],
    modal => modal.sendMessage
)

export const selectBrainstormingState = createSelector(
    [selectModal],
    modal => modal.createBrainstorming
)

export const selectPortfolioState = createSelector(
    [selectModal],
    modal => modal.portfolio
)

export const selectNotesState = createSelector(
    [selectModal],
    modal => modal.notes
)

export const selectNotesModifyState = createSelector(
    [selectModal],
    modal => modal.notesModify
)

export const selectPortfolioModifyState = createSelector(
    [selectModal],
    modal => modal.portfolioModify
)