import BrainstormingTypes from './brainstorming.types';

export const loadSubjects = payload => ({
    type: BrainstormingTypes.LOAD_SUBJECTS,
    payload
})

export const changeCurrentSubject = payload => ({
    type: BrainstormingTypes.CHANGE_CURRENT_SUBJECT,
    payload
})

export const loadMessages = payload => ({
    type: BrainstormingTypes.LOAD_MESSAGES,
    payload
})

export const updateSubject = payload => ({
    type: BrainstormingTypes.UPDATE_SUBJECT,
    payload
})

export const setLoading = payload => ({
    type: BrainstormingTypes.SET_LOADING,
    payload
})