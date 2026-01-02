import { createAction, props } from '@ngrx/store';
import { AuditLog, Role } from '../../models/security.model';

export const loadLogs = createAction('[Security] Load Logs');
export const loadLogsSuccess = createAction('[Security] Load Logs Success', props<{ logs: AuditLog[] }>());
export const loadLogsFailure = createAction('[Security] Load Logs Failure', props<{ error: any }>());

export const loadRoles = createAction('[Security] Load Roles');
export const loadRolesSuccess = createAction('[Security] Load Roles Success', props<{ roles: Role[] }>());
export const loadRolesFailure = createAction('[Security] Load Roles Failure', props<{ error: any }>());
