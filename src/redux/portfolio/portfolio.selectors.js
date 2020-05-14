import { createSelector } from "reselect";

const selectPortfolio = state => state.portfolio;

export const selectPortfolioItems = createSelector(
    [selectPortfolio],
    portfolio => portfolio.portfolioItems
)

export const selectCurrentItem = createSelector(
    [selectPortfolio],
    portfolio => portfolio.currentItem
)