import { createReducer, on } from '@ngrx/store';
import * as SecurityActions from './security.actions';
import { AuditLog, Role } from '../../models/security.model';

export interface SecurityState {
    logs: AuditLog[];
    roles: Role[];
    isLoading: boolean;
    error: any;
}

export const initialState: SecurityState = {
    logs: [],
    roles: [],
    isLoading: false,
    error: null
};

export const securityReducer = createReducer(
    initialState,
    on(SecurityActions.loadLogs, SecurityActions.loadRoles, (state) => ({ ...state, isLoading: true })),
    on(SecurityActions.loadLogsSuccess, (state, { logs }) => ({ ...state, logs, isLoading: false })),
    on(SecurityActions.loadRolesSuccess, (state, { roles }) => ({ ...state, roles, isLoading: false })),
    on(SecurityActions.loadLogsFailure, SecurityActions.loadRolesFailure, (state, { error }) => ({ ...state, isLoading: false, error }))
);
