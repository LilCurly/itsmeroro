import { createSelector } from 'reselect';

const selectBrainstorming = state => state.brainstorming;

export const selectBrainstormingSubjects = createSelector(
    [selectBrainstorming],
    brainstorming => brainstorming.subjects
)

export const selectCurrentSubject = createSelector(
    [selectBrainstorming],
    brainstorming => brainstorming.currentSubject
)

export const selectMessages = createSelector(
    [selectBrainstorming],
    brainstorming => brainstorming.messages
)

export const selectLoadingMessages = createSelector(
    [selectBrainstorming],
    brainstorming => brainstorming.loading
)