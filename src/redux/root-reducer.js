import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import sectionReducer from './section/section.reducer';
import ModalReducer from './modal/modal.reducer';
import BrainstormingReducer from './brainstorming/brainstorming.reducer';
import PortfolioReducer from './portfolio/portfolio.reducer';
import NotesReducer from './notes/notes.reducer';
import AuthenticateReducer from './authenticate/authenticate.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authenticate']
}

const rootReducer = combineReducers({
    section: sectionReducer,
    modal: ModalReducer,
    brainstorming: BrainstormingReducer,
    portfolio: PortfolioReducer,
    notes: NotesReducer,
    authenticate: AuthenticateReducer
});

export default persistReducer(persistConfig, rootReducer)