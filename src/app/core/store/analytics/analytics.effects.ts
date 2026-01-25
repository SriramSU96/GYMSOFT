import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as AnalyticsActions from './analytics.actions';
import { AnalyticsService } from '../../services/analytics.service';
import { ToastService } from '../../services/toast.service';

@Injectable()
export class AnalyticsEffects {
    private actions$ = inject(Actions);
    private analyticsService = inject(AnalyticsService);
    private toast = inject(ToastService);

    loadOverview$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AnalyticsActions.loadOverview),
            mergeMap(() =>
                this.analyticsService.getOverview().pipe(
                    map(response => AnalyticsActions.loadOverviewSuccess({ kpis: response.data })),
                    catchError(error => of(AnalyticsActions.loadOverviewFailure({ error })))
                )
            )
        )
    );

    loadRetention$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AnalyticsActions.loadRetention),
            mergeMap(() =>
                this.analyticsService.getRetention().pipe(
                    map(response => AnalyticsActions.loadRetentionSuccess({ retention: response.data })),
                    catchError(error => of(AnalyticsActions.loadRetentionFailure({ error })))
                )
            )
        )
    );

    loadPeakHours$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AnalyticsActions.loadPeakHours),
            mergeMap(() =>
                this.analyticsService.getPeakHours().pipe(
                    map(response => AnalyticsActions.loadPeakHoursSuccess({ peakHours: response.data })),
                    catchError(error => of(AnalyticsActions.loadPeakHoursFailure({ error })))
                )
            )
        )
    );

    loadTrainerPerformance$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AnalyticsActions.loadTrainerPerformance),
            mergeMap(() =>
                this.analyticsService.getTrainerPerformance().pipe(
                    map(response => AnalyticsActions.loadTrainerPerformanceSuccess({ performance: response.data })),
                    catchError(error => of(AnalyticsActions.loadTrainerPerformanceFailure({ error })))
                )
            )
        )
    );

    loadAdvancedAnalytics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AnalyticsActions.loadAdvancedAnalytics),
            mergeMap(action =>
                this.analyticsService.getAdvancedAnalytics(action.period).pipe(
                    map(response => AnalyticsActions.loadAdvancedAnalyticsSuccess({ analytics: response.data })),
                    catchError(error => of(AnalyticsActions.loadAdvancedAnalyticsFailure({ error })))
                )
            )
        )
    );
}
