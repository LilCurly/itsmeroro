import PortfolioTypes from './portfolio.types';

export const loadPortfolioItems = payload => ({
    type: PortfolioTypes.LOAD_PORTFOLIO,
    payload
})

export const changeCurrentItem = payload => ({
    type: PortfolioTypes.CHANGE_CURRENT_ITEM,
    payload
})