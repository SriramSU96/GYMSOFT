import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { StaffService } from '../../services/staff.service';
import * as StaffActions from './staff.actions';

@Injectable()
export class StaffEffects {
    private actions$ = inject(Actions);
    private staffService = inject(StaffService);

    loadStaff$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StaffActions.loadStaff),
            switchMap((action) =>
                this.staffService.getStaff(action.params).pipe(
                    map((response) => StaffActions.loadStaffSuccess({ response })),
                    catchError((error) => of(StaffActions.loadStaffFailure({ error })))
                )
            )
        )
    );

    loadStaffMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StaffActions.loadStaffMember),
            mergeMap((action) =>
                this.staffService.getStaffById(action.id).pipe(
                    map((response) => StaffActions.loadStaffMemberSuccess({ staff: response.staff })),
                    catchError((error) => of(StaffActions.loadStaffMemberFailure({ error })))
                )
            )
        )
    );

    createStaff$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StaffActions.createStaff),
            mergeMap((action) =>
                this.staffService.createStaff(action.staff).pipe(
                    map((response) => StaffActions.createStaffSuccess({ staff: response.staff })),
                    catchError((error) => of(StaffActions.createStaffFailure({ error })))
                )
            )
        )
    );

    updateStaff$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StaffActions.updateStaff),
            mergeMap((action) =>
                this.staffService.updateStaff(action.id, action.staff).pipe(
                    map((response) => StaffActions.updateStaffSuccess({ staff: response.staff })),
                    catchError((error) => of(StaffActions.updateStaffFailure({ error })))
                )
            )
        )
    );

    deleteStaff$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StaffActions.deleteStaff),
            mergeMap((action) =>
                this.staffService.deleteStaff(action.id).pipe(
                    map(() => StaffActions.deleteStaffSuccess({ id: action.id })),
                    catchError((error) => of(StaffActions.deleteStaffFailure({ error })))
                )
            )
        )
    );

    // Attendance
    loadAttendance$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StaffActions.loadStaffAttendance),
            switchMap((action) =>
                this.staffService.getAttendance(action.date).pipe(
                    map((response) => StaffActions.loadStaffAttendanceSuccess({ attendance: response.attendance })),
                    catchError((error) => of(StaffActions.loadStaffAttendanceFailure({ error })))
                )
            )
        )
    );

    markAttendance$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StaffActions.markAttendance),
            mergeMap((action) =>
                this.staffService.markAttendance(action.attendance).pipe(
                    map((response) => StaffActions.markAttendanceSuccess({ attendance: response.attendance })),
                    catchError((error) => of(StaffActions.markAttendanceFailure({ error })))
                )
            )
        )
    );

    // Salary
    loadSalaryRecords$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StaffActions.loadSalaryRecords),
            switchMap((action) =>
                this.staffService.getSalaryRecords(action.params).pipe(
                    map((response) => StaffActions.loadSalaryRecordsSuccess({ records: response.records })),
                    catchError((error) => of(StaffActions.loadSalaryRecordsFailure({ error })))
                )
            )
        )
    );

    generateSalary$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StaffActions.generateSalary),
            mergeMap((action) =>
                this.staffService.generateSalary(action.month, action.year, action.staffIds).pipe(
                    map((response) => StaffActions.generateSalarySuccess({ records: response.records })),
                    catchError((error) => of(StaffActions.generateSalaryFailure({ error })))
                )
            )
        )
    );
}
