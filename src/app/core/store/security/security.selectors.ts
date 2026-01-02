
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SecurityState } from './security.reducer';

export const selectSecurityState = createFeatureSelector<SecurityState>('security');
export const selectLogs = createSelector(selectSecurityState, (state) => state.logs);
export const selectRoles = createSelector(selectSecurityState, (state) => state.roles);
