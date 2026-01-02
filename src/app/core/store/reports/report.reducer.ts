
import { createReducer, on } from '@ngrx/store';
import * as ReportActions from './report.actions';
import { ProfitLoss, YearlySummary } from '../../models/report.model';

export interface ReportState {
    profitLoss: ProfitLoss | null;
    yearlySummary: YearlySummary | null;
    isLoading: boolean;
    error: any;
}

export const initialState: ReportState = {
    profitLoss: null,
    yearlySummary: null,
    isLoading: false,
    error: null
};

export const reportReducer = createReducer(
    initialState,
    on(ReportActions.loadProfitLoss, ReportActions.loadYearlySummary, ReportActions.addExpense, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(ReportActions.loadProfitLossSuccess, (state, { data }) => ({
        ...state,
        profitLoss: data,
        isLoading: false
    })),
    on(ReportActions.loadYearlySummarySuccess, (state, { data }) => ({
        ...state,
        yearlySummary: data,
        isLoading: false
    })),
    on(ReportActions.addExpenseSuccess, (state) => ({
        ...state, // Usually we might want to reload P&L after adding expense, or just stop loading
        isLoading: false
    })),
    on(ReportActions.loadProfitLossFailure, ReportActions.loadYearlySummaryFailure, ReportActions.addExpenseFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    }))
);
