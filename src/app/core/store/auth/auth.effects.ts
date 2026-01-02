
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            mergeMap((action) =>
                this.authService.login(action.credentials).pipe(
                    map((response) => AuthActions.loginSuccess({ response })),
                    catchError((error) => of(AuthActions.loginFailure({ error })))
                )
            )
        )
    );

    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap(({ response }) => {
                localStorage.setItem('token', response.token);
                this.router.navigate(['/']);
            })
        ),
        { dispatch: false }
    );

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.register),
            mergeMap((action) =>
                this.authService.register(action.userData).pipe(
                    map((user) => AuthActions.registerSuccess({ user })),
                    catchError((error) => of(AuthActions.registerFailure({ error })))
                )
            )
        )
    );

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loadUser),
            mergeMap(() =>
                this.authService.getMe().pipe(
                    map(user => AuthActions.loadUserSuccess({ user })),
                    catchError(error => of(AuthActions.loadUserFailure({ error })))
                )
            )
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(() => this.router.navigate(['/login']))
        ),
        { dispatch: false }
    );
}
