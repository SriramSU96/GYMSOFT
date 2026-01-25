import { createAction, props } from '@ngrx/store';
import { Expense, ExpenseFilter, ExpenseResponse, ExpenseStats, ExpenseCategory } from '../../models/expense.model';
import { Update } from '@ngrx/entity';

// Load
export const loadExpenses = createAction(
    '[Expenses] Load Expenses',
    props<{ filter?: ExpenseFilter }>()
);

export const loadExpensesSuccess = createAction(
    '[Expenses] Load Expenses Success',
    props<{ response: ExpenseResponse }>()
);

export const loadExpensesFailure = createAction(
    '[Expenses] Load Expenses Failure',
    props<{ error: any }>()
);

// Add
export const addExpense = createAction(
    '[Expenses] Add Expense',
    props<{ expense: Partial<Expense> }>()
);

export const addExpenseSuccess = createAction(
    '[Expenses] Add Expense Success',
    props<{ expense: Expense }>()
);

export const addExpenseFailure = createAction(
    '[Expenses] Add Expense Failure',
    props<{ error: any }>()
);

// Update
export const updateExpense = createAction(
    '[Expenses] Update Expense',
    props<{ id: string; updates: Partial<Expense> }>()
);

export const updateExpenseSuccess = createAction(
    '[Expenses] Update Expense Success',
    props<{ update: Update<Expense> }>()
);

export const updateExpenseFailure = createAction(
    '[Expenses] Update Expense Failure',
    props<{ error: any }>()
);

// Delete
export const deleteExpense = createAction(
    '[Expenses] Delete Expense',
    props<{ id: string }>()
);

export const deleteExpenseSuccess = createAction(
    '[Expenses] Delete Expense Success',
    props<{ id: string }>()
);

export const deleteExpenseFailure = createAction(
    '[Expenses] Delete Expense Failure',
    props<{ error: any }>()
);

// Categories
export const loadCategories = createAction('[Expenses] Load Categories');

export const loadCategoriesSuccess = createAction(
    '[Expenses] Load Categories Success',
    props<{ categories: ExpenseCategory[] }>()
);

export const loadCategoriesFailure = createAction(
    '[Expenses] Load Categories Failure',
    props<{ error: any }>()
);
