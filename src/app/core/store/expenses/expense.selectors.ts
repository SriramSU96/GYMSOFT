import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExpenseState, selectAll } from './expense.reducer';

export const selectExpenseState = createFeatureSelector<ExpenseState>('expenses');

export const selectAllExpenses = createSelector(
    selectExpenseState,
    selectAll
);

export const selectExpenseLoading = createSelector(
    selectExpenseState,
    (state) => state.loading
);

export const selectExpenseCategories = createSelector(
    selectExpenseState,
    (state) => state.categories
);
