import AuthenticateTypes from './authenticate.types';

const INITIAL_STATE = {
    auth: false
}

const AuthenticateReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AuthenticateTypes.TOGGLE_AUTHENTICATE:
            return {
                ...state,
                auth: !state.auth
            }
        default:
            return state;
    }
}

export default AuthenticateReducer;