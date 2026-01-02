
import { createAction, props } from '@ngrx/store';
import { ProfitLoss, YearlySummary, Expense } from '../../models/report.model';

export const loadProfitLoss = createAction('[Report] Load Profit Loss');
export const loadProfitLossSuccess = createAction('[Report] Load Profit Loss Success', props<{ data: ProfitLoss }>());
export const loadProfitLossFailure = createAction('[Report] Load Profit Loss Failure', props<{ error: any }>());

export const loadYearlySummary = createAction('[Report] Load Yearly Summary');
export const loadYearlySummarySuccess = createAction('[Report] Load Yearly Summary Success', props<{ data: YearlySummary }>());
export const loadYearlySummaryFailure = createAction('[Report] Load Yearly Summary Failure', props<{ error: any }>());

export const addExpense = createAction('[Report] Add Expense', props<{ expense: Partial<Expense> }>());
export const addExpenseSuccess = createAction('[Report] Add Expense Success', props<{ expense: Expense }>());
export const addExpenseFailure = createAction('[Report] Add Expense Failure', props<{ error: any }>());
