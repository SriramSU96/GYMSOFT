
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AnalyticsService } from '../../services/analytics.service';
import * as AnalyticsActions from './analytics.actions';

@Injectable()
export class AnalyticsEffects {
    private actions$ = inject(Actions);
    private analyticsService = inject(AnalyticsService);

    loadOverview$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AnalyticsActions.loadOverview),
            mergeMap(() =>
                this.analyticsService.getOverview().pipe(
                    map((kpis) => AnalyticsActions.loadOverviewSuccess({ kpis })),
                    catchError((error) => of(AnalyticsActions.loadOverviewFailure({ error })))
                )
            )
        )
    );

    loadAdvancedAnalytics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AnalyticsActions.loadAdvancedAnalytics),
            mergeMap(({ filter }) =>
                this.analyticsService.getAdvancedAnalytics(filter).pipe(
                    map((data) => AnalyticsActions.loadAdvancedAnalyticsSuccess({ data })),
                    catchError((error) => of(AnalyticsActions.loadAdvancedAnalyticsFailure({ error })))
                )
            )
        )
    );

    loadFinancialReport$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AnalyticsActions.loadFinancialReport),
            mergeMap(({ month }) =>
                this.analyticsService.getFinancialReport(month).pipe(
                    map((report) => AnalyticsActions.loadFinancialReportSuccess({ report })),
                    catchError((error) => of(AnalyticsActions.loadFinancialReportFailure({ error })))
                )
            )
        )
    );
}
