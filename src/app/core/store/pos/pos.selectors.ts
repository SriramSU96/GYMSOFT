import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PosState, selectAll } from './pos.reducer';

export const selectPosState = createFeatureSelector<PosState>('pos');

export const selectAllProducts = createSelector(
    selectPosState,
    selectAll
);

export const selectPosLoading = createSelector(
    selectPosState,
    (state) => state.loading
);

export const selectSalesHistory = createSelector(
    selectPosState,
    (state) => state.salesHistory
);

export const selectSalesLoading = createSelector(
    selectPosState,
    (state) => state.salesLoading
);
