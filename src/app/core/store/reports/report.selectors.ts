
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReportState } from './report.reducer';

export const selectReportState = createFeatureSelector<ReportState>('reports');

export const selectProfitLoss = createSelector(
    selectReportState,
    (state) => state.profitLoss
);

export const selectYearlySummary = createSelector(
    selectReportState,
    (state) => state.yearlySummary
);

export const selectReportIsLoading = createSelector(
    selectReportState,
    (state) => state.isLoading
);

export const selectReportError = createSelector(
    selectReportState,
    (state) => state.error
);
