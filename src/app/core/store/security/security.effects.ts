import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as SecurityActions from './security.actions';
import { SecurityService } from '../../services/security.service';
import { ToastService } from '../../services/toast.service';

@Injectable()
export class SecurityEffects {
    private actions$ = inject(Actions);
    private securityService = inject(SecurityService);
    private toast = inject(ToastService);

    loadLogs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SecurityActions.loadAuditLogs),
            mergeMap(action =>
                this.securityService.getLogs(action.filter).pipe(
                    map(response => SecurityActions.loadAuditLogsSuccess({ logs: response.data })),
                    catchError(error => of(SecurityActions.loadAuditLogsFailure({ error })))
                )
            )
        )
    );

    loadStats$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SecurityActions.loadSecurityStats),
            mergeMap(() =>
                this.securityService.getSecurityStats().pipe(
                    map(response => SecurityActions.loadSecurityStatsSuccess({ stats: response.data })),
                    catchError(error => of(SecurityActions.loadSecurityStatsFailure({ error })))
                )
            )
        )
    );

    loadRoles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SecurityActions.loadRoles),
            mergeMap(() =>
                this.securityService.getRoles().pipe(
                    map(response => SecurityActions.loadRolesSuccess({ roles: response.data })),
                    catchError(error => of(SecurityActions.loadRolesFailure({ error })))
                )
            )
        )
    );

    revokeSession$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SecurityActions.revokeSession),
            mergeMap(action =>
                this.securityService.revokeSession(action.sessionId).pipe(
                    map(() => {
                        this.toast.success('Session Revoked');
                        return SecurityActions.revokeSessionSuccess({ sessionId: action.sessionId });
                    }),
                    catchError(error => {
                        this.toast.error('Revocation Failed');
                        return of(SecurityActions.revokeSessionFailure({ error }));
                    })
                )
            )
        )
    );
}
