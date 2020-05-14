import SectionTypes from './section.types';

export const changeCurrentSection = (section) => ({
    type: SectionTypes.CHANGE_CURRENT_SECTION,
    payload: section
})