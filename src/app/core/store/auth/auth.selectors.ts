
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
    selectAuthState,
    (state) => state.user
);

export const selectIsLoggedIn = createSelector(
    selectAuthState,
    (state) => !!state.token
);

export const selectIsLoading = createSelector(
    selectAuthState,
    (state) => state.isLoading
);

export const selectError = createSelector(
    selectAuthState,
    (state) => state.error
);
