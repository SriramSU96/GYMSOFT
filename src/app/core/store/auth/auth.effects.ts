
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
                // Store token
                localStorage.setItem('token', response.token);
                // Store user object
                localStorage.setItem('user', JSON.stringify(response.user));
                // Navigate to dashboard
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
                    map((response: any) => {
                        // Handle possible different response structure or just user
                        const user = response.user || response;
                        // If registration also logs in (returns token)
                        if (response.token) {
                            localStorage.setItem('token', response.token);
                            localStorage.setItem('user', JSON.stringify(user));
                        }
                        return AuthActions.registerSuccess({ user });
                    }),
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
                    map(response => AuthActions.loadUserSuccess({ user: response.user })),
                    catchError(error => of(AuthActions.loadUserFailure({ error })))
                )
            )
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(() => {
                this.authService.logout();
                this.router.navigate(['/auth/login']);
            })
        ),
        { dispatch: false }
    );
}
