
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../models/user.model';

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: any;
}

export const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, AuthActions.register, AuthActions.loadUser, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(AuthActions.loginSuccess, (state, { response }) => {
        localStorage.setItem('token', response.token);
        const { token, ...user } = response; // Extract user data from LoginResponse
        return {
            ...state,
            user: user as User,
            token: response.token,
            isLoading: false
        };
    }),
    on(AuthActions.registerSuccess, (state, { user }) => ({
        ...state, // Register usually doesn't return token immediately in some APIs, but often does. Assuming just user for now as per action.
        isLoading: false
    })),
    on(AuthActions.loadUserSuccess, (state, { user }) => ({
        ...state,
        user,
        isLoading: false
    })),
    on(AuthActions.loginFailure, AuthActions.registerFailure, AuthActions.loadUserFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),
    on(AuthActions.logout, (state) => {
        localStorage.removeItem('token');
        return {
            ...state,
            user: null,
            token: null
        };
    })
);
