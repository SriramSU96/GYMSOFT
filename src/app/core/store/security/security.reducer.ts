import { createReducer, on } from '@ngrx/store';
import { AuditLog, SecurityStats, Role } from '../../models/security.model';
import * as SecurityActions from './security.actions';

export interface SecurityState {
    logs: AuditLog[];
    stats: SecurityStats | null;
    roles: Role[];
    loading: boolean;
    error: any;
}

export const initialState: SecurityState = {
    logs: [],
    stats: null,
    roles: [],
    loading: false,
    error: null
};

export const securityReducer = createReducer(
    initialState,

    // Logs
    on(SecurityActions.loadAuditLogs, (state) => ({ ...state, loading: true, error: null })),
    on(SecurityActions.loadAuditLogsSuccess, (state, { logs }) => ({ ...state, logs, loading: false })),
    on(SecurityActions.loadAuditLogsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // Stats
    on(SecurityActions.loadSecurityStats, (state) => ({ ...state, loading: true, error: null })),
    on(SecurityActions.loadSecurityStatsSuccess, (state, { stats }) => ({ ...state, stats, loading: false })),
    on(SecurityActions.loadSecurityStatsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // Roles
    on(SecurityActions.loadRoles, (state) => ({ ...state, loading: true, error: null })),
    on(SecurityActions.loadRolesSuccess, (state, { roles }) => ({ ...state, roles, loading: false })),
    on(SecurityActions.loadRolesFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // Session
    on(SecurityActions.revokeSession, (state) => ({ ...state, loading: true, error: null })),
    on(SecurityActions.revokeSessionSuccess, (state) => ({ ...state, loading: false })), // Stats might need refresh
    on(SecurityActions.revokeSessionFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
