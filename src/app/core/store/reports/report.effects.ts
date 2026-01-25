import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as ReportActions from './report.actions';
import { ReportService } from '../../services/report.service';
import { ToastService } from '../../services/toast.service';

@Injectable()
export class ReportEffects {
    private actions$ = inject(Actions);
    private reportService = inject(ReportService);
    private toast = inject(ToastService);

    loadProfitLoss$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportActions.loadProfitLoss),
            mergeMap(() =>
                this.reportService.getProfitLoss().pipe(
                    map(response => ReportActions.loadProfitLossSuccess({ data: response.data })),
                    catchError(error => of(ReportActions.loadProfitLossFailure({ error })))
                )
            )
        )
    );

    loadYearlySummary$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportActions.loadYearlySummary),
            mergeMap(action =>
                this.reportService.getYearlySummary(action.year).pipe(
                    map(response => ReportActions.loadYearlySummarySuccess({ data: response.data })),
                    catchError(error => of(ReportActions.loadYearlySummaryFailure({ error })))
                )
            )
        )
    );

    generateMemberReport$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportActions.generateMemberReport),
            mergeMap(action =>
                this.reportService.getMemberReport(action.filter).pipe(
                    map(response => {
                        this.toast.success('Report Generated');
                        return ReportActions.generateMemberReportSuccess({ data: response.data });
                    }),
                    catchError(error => {
                        this.toast.error('Generation Failed');
                        return of(ReportActions.generateMemberReportFailure({ error }));
                    })
                )
            )
        )
    );

    generateAttendanceReport$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportActions.generateAttendanceReport),
            mergeMap(action =>
                this.reportService.getAttendanceReport(action.filter).pipe(
                    map(response => {
                        this.toast.success('Report Generated');
                        return ReportActions.generateAttendanceReportSuccess({ data: response.data });
                    }),
                    catchError(error => {
                        this.toast.error('Generation Failed');
                        return of(ReportActions.generateAttendanceReportFailure({ error }));
                    })
                )
            )
        )
    );

    downloadReport$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportActions.downloadReport),
            mergeMap(action =>
                this.reportService.downloadReport(action.reportType, action.filter, action.format).pipe(
                    map(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `${action.reportType}_Report.${action.format.toLowerCase()}`;
                        link.click();
                        window.URL.revokeObjectURL(url);
                        this.toast.success('Download Started');
                        return ReportActions.downloadReportSuccess();
                    }),
                    catchError(error => {
                        this.toast.error('Download Failed');
                        return of(ReportActions.downloadReportFailure({ error }));
                    })
                )
            )
        )
    );
}
