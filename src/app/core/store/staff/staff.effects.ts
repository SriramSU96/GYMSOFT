
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { StaffService } from '../../services/staff.service';
import * as StaffActions from './staff.actions';

@Injectable()
export class StaffEffects {
    private actions$ = inject(Actions);
    private staffService = inject(StaffService);

    loadStaff$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StaffActions.loadStaff),
            mergeMap(() =>
                this.staffService.getStaff().pipe(
                    map((staff) => StaffActions.loadStaffSuccess({ staff })),
                    catchError((error) => of(StaffActions.loadStaffFailure({ error })))
                )
            )
        )
    );

    addStaff$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StaffActions.addStaff),
            mergeMap(({ staff }) =>
                this.staffService.addStaff(staff).pipe(
                    map((newStaff) => StaffActions.addStaffSuccess({ staff: newStaff })),
                    catchError((error) => of(StaffActions.addStaffFailure({ error })))
                )
            )
        )
    );
}
