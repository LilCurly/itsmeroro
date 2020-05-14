import PortfolioTypes from './portfolio.types';

const INITIAL_STATE = {
    portfolioItems: {},
    currentItem: null
}

const PortfolioReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PortfolioTypes.LOAD_PORTFOLIO:
            return {
                ...state,
                portfolioItems: action.payload
            }
        case PortfolioTypes.CHANGE_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.payload
            }
        default:
            return state;
    }
}

export default PortfolioReducer;