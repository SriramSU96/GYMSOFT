import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GymState } from './gym.reducer';

export const selectGymState = createFeatureSelector<GymState>('gyms');

export const selectCurrentGym = createSelector(selectGymState, state => state.currentGym);
export const selectGymBranches = createSelector(selectGymState, state => state.branches);
export const selectGymLoading = createSelector(selectGymState, state => state.loading);
