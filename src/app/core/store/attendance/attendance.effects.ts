import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as AttendanceActions from './attendance.actions';
import { AttendanceService } from '../../services/attendance.service';
import { Update } from '@ngrx/entity';

@Injectable()
export class AttendanceEffects {
    private actions$ = inject(Actions);
    private attendanceService = inject(AttendanceService);

    loadAttendance$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AttendanceActions.loadAttendance),
            mergeMap(action =>
                this.attendanceService.getAttendance(action.filter).pipe(
                    map(response => AttendanceActions.loadAttendanceSuccess({ response })),
                    catchError(error => of(AttendanceActions.loadAttendanceFailure({ error })))
                )
            )
        )
    );

    markAttendance$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AttendanceActions.markAttendance),
            mergeMap(action =>
                this.attendanceService.markAttendance(action.data).pipe(
                    map(response => AttendanceActions.markAttendanceSuccess({ attendance: response.data })),
                    catchError(error => of(AttendanceActions.markAttendanceFailure({ error })))
                )
            )
        )
    );

    checkIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AttendanceActions.checkIn),
            mergeMap(action =>
                this.attendanceService.checkIn(action.data).pipe(
                    map(response => AttendanceActions.checkInSuccess({ attendance: response.data })),
                    catchError(error => of(AttendanceActions.checkInFailure({ error })))
                )
            )
        )
    );

    qrCheckIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AttendanceActions.qrCheckIn),
            mergeMap(action =>
                this.attendanceService.qrCheckIn(action.token).pipe(
                    map(response => AttendanceActions.qrCheckInSuccess({ attendance: response.data })),
                    catchError(error => of(AttendanceActions.qrCheckInFailure({ error })))
                )
            )
        )
    );

    checkOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AttendanceActions.checkOut),
            mergeMap(action =>
                this.attendanceService.checkOut(action.id, action.checkOutTime).pipe(
                    map(response => {
                        const update: Update<any> = {
                            id: response.data._id || action.id, // Fallback if ID is missing in response
                            changes: response.data
                        };
                        return AttendanceActions.checkOutSuccess({ update });
                    }),
                    catchError(error => of(AttendanceActions.checkOutFailure({ error })))
                )
            )
        )
    );

    loadStats$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AttendanceActions.loadAttendanceStats),
            mergeMap(action =>
                this.attendanceService.getAttendanceSummary(action.date).pipe(
                    map(response => AttendanceActions.loadAttendanceStatsSuccess({ stats: response.data })),
                    catchError(error => of(AttendanceActions.loadAttendanceStatsFailure({ error })))
                )
            )
        )
    );
}
