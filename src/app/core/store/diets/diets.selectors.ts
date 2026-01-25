import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DietsState, adapter } from './diets.reducer';

export const selectDietsState = createFeatureSelector<DietsState>('diets');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors(selectDietsState);

export const selectAllDietPlans = selectAll;

export const selectDietsLoading = createSelector(
    selectDietsState,
    (state) => state.isLoading
);

export const selectDietsError = createSelector(
    selectDietsState,
    (state) => state.error
);

export const selectSelectedDietPlan = createSelector(
    selectDietsState,
    (state) => state.selectedPlan
);
