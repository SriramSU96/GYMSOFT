import { createAction, props } from '@ngrx/store';
import { AuditLog, SecurityStats, SecurityLogFilter, Role } from '../../models/security.model';

// Logs
export const loadAuditLogs = createAction(
    '[Security] Load Audit Logs',
    props<{ filter?: SecurityLogFilter }>()
);
export const loadLogs = loadAuditLogs; // Alias

export const loadAuditLogsSuccess = createAction(
    '[Security] Load Audit Logs Success',
    props<{ logs: AuditLog[] }>()
);

export const loadAuditLogsFailure = createAction(
    '[Security] Load Audit Logs Failure',
    props<{ error: any }>()
);

// Stats
export const loadSecurityStats = createAction('[Security] Load Security Stats');
export const loadSecurityStatsSuccess = createAction(
    '[Security] Load Security Stats Success',
    props<{ stats: SecurityStats }>()
);
export const loadSecurityStatsFailure = createAction(
    '[Security] Load Security Stats Failure',
    props<{ error: any }>()
);

// Roles
export const loadRoles = createAction('[Security] Load Roles');
export const loadRolesSuccess = createAction(
    '[Security] Load Roles Success',
    props<{ roles: Role[] }>()
);
export const loadRolesFailure = createAction(
    '[Security] Load Roles Failure',
    props<{ error: any }>()
);

// Sessions
export const revokeSession = createAction(
    '[Security] Revoke Session',
    props<{ sessionId: string }>()
);
export const revokeSessionSuccess = createAction(
    '[Security] Revoke Session Success',
    props<{ sessionId: string }>()
);
export const revokeSessionFailure = createAction(
    '[Security] Revoke Session Failure',
    props<{ error: any }>()
);
