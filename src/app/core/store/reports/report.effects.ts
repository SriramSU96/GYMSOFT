
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ReportService } from '../../services/report.service';
import * as ReportActions from './report.actions';

@Injectable()
export class ReportEffects {
    private actions$ = inject(Actions);
    private reportService = inject(ReportService);

    loadProfitLoss$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportActions.loadProfitLoss),
            mergeMap(() =>
                this.reportService.getProfitLoss().pipe(
                    map((data) => ReportActions.loadProfitLossSuccess({ data })),
                    catchError((error) => of(ReportActions.loadProfitLossFailure({ error })))
                )
            )
        )
    );

    loadYearlySummary$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportActions.loadYearlySummary),
            mergeMap(() =>
                this.reportService.getYearlySummary().pipe(
                    map((data) => ReportActions.loadYearlySummarySuccess({ data })),
                    catchError((error) => of(ReportActions.loadYearlySummaryFailure({ error })))
                )
            )
        )
    );

    addExpense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportActions.addExpense),
            mergeMap(({ expense }) =>
                this.reportService.addExpense(expense as any).pipe(
                    map((newExpense) => ReportActions.addExpenseSuccess({ expense: newExpense })),
                    catchError((error) => of(ReportActions.addExpenseFailure({ error })))
                )
            )
        )
    );
}
