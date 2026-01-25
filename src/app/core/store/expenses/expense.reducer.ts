import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Expense, ExpenseCategory } from '../../models/expense.model';
import * as ExpenseActions from './expense.actions';

export interface ExpenseState extends EntityState<Expense> {
    loading: boolean;
    error: any;
    total: number;
    categories: ExpenseCategory[];
}

export const adapter: EntityAdapter<Expense> = createEntityAdapter<Expense>({
    selectId: (e) => e._id || '',
    sortComparer: (a, b) => (b.date ? new Date(b.date).getTime() : 0) - (a.date ? new Date(a.date).getTime() : 0)
});

export const initialState: ExpenseState = adapter.getInitialState({
    loading: false,
    error: null,
    total: 0,
    categories: []
});

export const expenseReducer = createReducer(
    initialState,

    on(ExpenseActions.loadExpenses, (state) => ({ ...state, loading: true, error: null })),
    on(ExpenseActions.loadExpensesSuccess, (state, { response }) =>
        adapter.setAll(response.data, { ...state, loading: false, total: response.count || 0 })
    ),
    on(ExpenseActions.loadExpensesFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(ExpenseActions.addExpense, (state) => ({ ...state, loading: true, error: null })),
    on(ExpenseActions.addExpenseSuccess, (state, { expense }) =>
        adapter.addOne(expense, { ...state, loading: false })
    ),
    on(ExpenseActions.addExpenseFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(ExpenseActions.updateExpense, (state) => ({ ...state, loading: true, error: null })),
    on(ExpenseActions.updateExpenseSuccess, (state, { update }) =>
        adapter.updateOne(update, { ...state, loading: false })
    ),
    on(ExpenseActions.updateExpenseFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(ExpenseActions.deleteExpense, (state) => ({ ...state, loading: true, error: null })),
    on(ExpenseActions.deleteExpenseSuccess, (state, { id }) =>
        adapter.removeOne(id, { ...state, loading: false })
    ),
    on(ExpenseActions.deleteExpenseFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(ExpenseActions.loadCategoriesSuccess, (state, { categories }) => ({ ...state, categories }))
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
