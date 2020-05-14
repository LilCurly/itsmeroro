import { createSelector } from 'reselect';

const selectSection = state => state.section;

export const selectCurrentSection = createSelector(
    [selectSection],
    section => section.currentSection
)