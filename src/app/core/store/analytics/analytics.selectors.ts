import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnalyticsState } from './analytics.reducer';

export const selectAnalyticsState = createFeatureSelector<AnalyticsState>('analytics');

export const selectOverview = createSelector(selectAnalyticsState, state => state.overview);
export const selectRetention = createSelector(selectAnalyticsState, state => state.retention);
export const selectPeakHours = createSelector(selectAnalyticsState, state => state.peakHours);
export const selectTrainerPerformance = createSelector(selectAnalyticsState, state => state.trainerPerformance);
export const selectAdvancedAnalytics = createSelector(selectAnalyticsState, state => state.advancedAnalytics);

export const selectAnalyticsLoading = createSelector(selectAnalyticsState, state => state.loading);
