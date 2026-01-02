
import { createAction, props } from '@ngrx/store';
import { LoginResponse, User } from '../../models/user.model';

export const login = createAction('[Auth] Login', props<{ credentials: any }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ response: LoginResponse }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());

export const register = createAction('[Auth] Register', props<{ userData: any }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ user: User }>());
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: any }>());

export const loadUser = createAction('[Auth] Load User');
export const loadUserSuccess = createAction('[Auth] Load User Success', props<{ user: User }>());
export const loadUserFailure = createAction('[Auth] Load User Failure', props<{ error: any }>());

export const logout = createAction('[Auth] Logout');
