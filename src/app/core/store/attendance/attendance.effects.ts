
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AttendanceService } from '../../services/attendance.service';
import * as AttendanceActions from './attendance.actions';

@Injectable()
export class AttendanceEffects {
    private actions$ = inject(Actions);
    private attendanceService = inject(AttendanceService);

    qrCheckIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AttendanceActions.qrCheckIn),
            mergeMap(({ data }) =>
                this.attendanceService.qrCheckIn(data).pipe(
                    map((record) => AttendanceActions.qrCheckInSuccess({ record })),
                    catchError((error) => of(AttendanceActions.qrCheckInFailure({ error })))
                )
            )
        )
    );

    syncAttendance$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AttendanceActions.syncAttendance),
            mergeMap(({ records }) =>
                this.attendanceService.syncAttendance(records).pipe(
                    map(() => AttendanceActions.syncAttendanceSuccess()),
                    catchError((error) => of(AttendanceActions.syncAttendanceFailure({ error })))
                )
            )
        )
    );

    loadMemberAttendance$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AttendanceActions.loadMemberAttendance),
            mergeMap(({ memberId }) =>
                this.attendanceService.getMemberAttendance(memberId).pipe(
                    map((records) => AttendanceActions.loadMemberAttendanceSuccess({ records })),
                    catchError((error) => of(AttendanceActions.loadMemberAttendanceFailure({ error })))
                )
            )
        )
    );
}
