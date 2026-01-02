
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { SecurityService } from '../../services/security.service';
import * as SecurityActions from './security.actions';

@Injectable()
export class SecurityEffects {
    private actions$ = inject(Actions);
    private securityService = inject(SecurityService);

    loadLogs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SecurityActions.loadLogs),
            mergeMap(() =>
                this.securityService.getLogs().pipe(
                    map((logs) => SecurityActions.loadLogsSuccess({ logs })),
                    catchError((error) => of(SecurityActions.loadLogsFailure({ error })))
                )
            )
        )
    );

    loadRoles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SecurityActions.loadRoles),
            mergeMap(() =>
                this.securityService.getRoles().pipe(
                    map((roles) => SecurityActions.loadRolesSuccess({ roles })),
                    catchError((error) => of(SecurityActions.loadRolesFailure({ error })))
                )
            )
        )
    );
}
