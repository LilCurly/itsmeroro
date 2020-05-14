import { createSelector } from 'reselect';

const selectAuthenticate = state => state.authenticate;

export const selectAuthenticateState = createSelector(
    [selectAuthenticate],
    authenticate => authenticate.auth
)