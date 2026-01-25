import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReportState } from './report.reducer';

export const selectReportState = createFeatureSelector<ReportState>('reports');

export const selectProfitLoss = createSelector(selectReportState, state => state.profitLoss);
export const selectYearlySummary = createSelector(selectReportState, state => state.yearlySummary);
export const selectMemberReport = createSelector(selectReportState, state => state.memberReport);
export const selectAttendanceReport = createSelector(selectReportState, state => state.attendanceReport);

export const selectReportLoading = createSelector(selectReportState, state => state.loading);
export const selectReportIsLoading = selectReportLoading; // Alias
