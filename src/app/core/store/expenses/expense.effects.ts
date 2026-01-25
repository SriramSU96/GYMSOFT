import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as ExpenseActions from './expense.actions';
import { ExpenseService } from '../../services/expense.service';
import { ToastService } from '../../services/toast.service';

@Injectable()
export class ExpenseEffects {
    private actions$ = inject(Actions);
    private expenseService = inject(ExpenseService);
    private toast = inject(ToastService);

    loadExpenses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpenseActions.loadExpenses),
            mergeMap(action =>
                this.expenseService.getExpenses(action.filter).pipe(
                    map(response => ExpenseActions.loadExpensesSuccess({ response })),
                    catchError(error => of(ExpenseActions.loadExpensesFailure({ error })))
                )
            )
        )
    );

    addExpense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpenseActions.addExpense),
            mergeMap(action =>
                this.expenseService.addExpense(action.expense).pipe(
                    map(response => {
                        this.toast.success('Expense Added');
                        return ExpenseActions.addExpenseSuccess({ expense: response.data });
                    }),
                    catchError(error => {
                        this.toast.error('Failed to Add Expense');
                        return of(ExpenseActions.addExpenseFailure({ error }));
                    })
                )
            )
        )
    );

    updateExpense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpenseActions.updateExpense),
            mergeMap(action =>
                this.expenseService.updateExpense(action.id, action.updates).pipe(
                    map(response => {
                        this.toast.success('Expense Updated');
                        return ExpenseActions.updateExpenseSuccess({ update: { id: action.id, changes: response.data } });
                    }),
                    catchError(error => {
                        this.toast.error('Failed to Update Expense');
                        return of(ExpenseActions.updateExpenseFailure({ error }));
                    })
                )
            )
        )
    );

    deleteExpense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpenseActions.deleteExpense),
            mergeMap(action =>
                this.expenseService.deleteExpense(action.id).pipe(
                    map(() => {
                        this.toast.success('Expense Deleted');
                        return ExpenseActions.deleteExpenseSuccess({ id: action.id });
                    }),
                    catchError(error => {
                        this.toast.error('Failed to Delete Expense');
                        return of(ExpenseActions.deleteExpenseFailure({ error }));
                    })
                )
            )
        )
    );

    loadCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExpenseActions.loadCategories),
            mergeMap(() =>
                this.expenseService.getCategories().pipe(
                    map(response => ExpenseActions.loadCategoriesSuccess({ categories: response.data })),
                    catchError(error => of(ExpenseActions.loadCategoriesFailure({ error })))
                )
            )
        )
    );
}
