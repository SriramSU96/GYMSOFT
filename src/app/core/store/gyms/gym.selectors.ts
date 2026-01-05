import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GymState } from './gym.reducer';

export const selectGymState = createFeatureSelector<GymState>('gyms');

export const selectAllGyms = createSelector(
    selectGymState,
    (state) => state.gyms
);

export const selectAllBranches = createSelector(
    selectGymState,
    (state) => state.branches
);

export const selectSelectedGym = createSelector(
    selectGymState,
    (state) => state.selectedGym
);

export const selectGymLoading = createSelector(
    selectGymState,
    (state) => state.isLoading
);
