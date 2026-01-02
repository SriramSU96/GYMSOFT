
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnalyticsState } from './analytics.reducer';

export const selectAnalyticsState = createFeatureSelector<AnalyticsState>('analytics');
export const selectAnalytics = createSelector(selectAnalyticsState, (state) => state.kpis);
export const selectOverview = createSelector(selectAnalyticsState, (state) => state.kpis);

// Advanced Analytics Selectors
export const selectAdvancedAnalytics = createSelector(selectAnalyticsState, (state) => state.advancedAnalytics);
export const selectAdvancedAnalyticsLoading = createSelector(selectAnalyticsState, (state) => state.advancedAnalyticsLoading);
export const selectAdvancedAnalyticsError = createSelector(selectAnalyticsState, (state) => state.advancedAnalyticsError);

// Financial Report Selectors
export const selectFinancialReport = createSelector(selectAnalyticsState, (state) => state.financialReport);
export const selectFinancialReportLoading = createSelector(selectAnalyticsState, (state) => state.financialReportLoading);
export const selectFinancialReportError = createSelector(selectAnalyticsState, (state) => state.financialReportError);
