import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SecurityState } from './security.reducer';

export const selectSecurityState = createFeatureSelector<SecurityState>('security');

export const selectAuditLogs = createSelector(selectSecurityState, state => state.logs);
export const selectLogs = selectAuditLogs; // Alias
export const selectSecurityStats = createSelector(selectSecurityState, state => state.stats);
export const selectRoles = createSelector(selectSecurityState, state => state.roles);
export const selectSecurityLoading = createSelector(selectSecurityState, state => state.loading);
