
import { createReducer, on } from '@ngrx/store';
import * as AnalyticsActions from './analytics.actions';
import { GymKPIs, AdvancedAnalytics, FinancialReport } from '../../models/analytics.model';

export interface AnalyticsState {
    kpis: GymKPIs | null;
    advancedAnalytics: AdvancedAnalytics | null;
    financialReport: FinancialReport | null;
    isLoading: boolean;
    advancedAnalyticsLoading: boolean;
    financialReportLoading: boolean;
    error: any;
    advancedAnalyticsError: any;
    financialReportError: any;
}

export const initialState: AnalyticsState = {
    kpis: null,
    advancedAnalytics: null,
    financialReport: null,
    isLoading: false,
    advancedAnalyticsLoading: false,
    financialReportLoading: false,
    error: null,
    advancedAnalyticsError: null,
    financialReportError: null
};

export const analyticsReducer = createReducer(
    initialState,
    on(AnalyticsActions.loadOverview, (state) => ({ ...state, isLoading: true })),
    on(AnalyticsActions.loadOverviewSuccess, (state, { kpis }) => ({ ...state, kpis, isLoading: false })),
    on(AnalyticsActions.loadOverviewFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

    // Advanced Analytics Reducers
    on(AnalyticsActions.loadAdvancedAnalytics, (state) => ({ ...state, advancedAnalyticsLoading: true, advancedAnalyticsError: null })),
    on(AnalyticsActions.loadAdvancedAnalyticsSuccess, (state, { data }) => ({ ...state, advancedAnalytics: data, advancedAnalyticsLoading: false })),
    on(AnalyticsActions.loadAdvancedAnalyticsFailure, (state, { error }) => ({ ...state, advancedAnalyticsLoading: false, advancedAnalyticsError: error })),

    // Financial Report Reducers
    on(AnalyticsActions.loadFinancialReport, (state) => ({ ...state, financialReportLoading: true, financialReportError: null })),
    on(AnalyticsActions.loadFinancialReportSuccess, (state, { report }) => ({ ...state, financialReport: report, financialReportLoading: false })),
    on(AnalyticsActions.loadFinancialReportFailure, (state, { error }) => ({ ...state, financialReportLoading: false, financialReportError: error }))
);
