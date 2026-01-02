
import { createAction, props } from '@ngrx/store';
import { Attendance } from '../../models/attendance.model';

export const qrCheckIn = createAction('[Attendance] QR Check In', props<{ data: any }>());
export const qrCheckInSuccess = createAction('[Attendance] QR Check In Success', props<{ record: Attendance }>());
export const qrCheckInFailure = createAction('[Attendance] QR Check In Failure', props<{ error: any }>());

export const syncAttendance = createAction('[Attendance] Sync Attendance', props<{ records: Attendance[] }>());
export const syncAttendanceSuccess = createAction('[Attendance] Sync Attendance Success');
export const syncAttendanceFailure = createAction('[Attendance] Sync Attendance Failure', props<{ error: any }>());

export const loadMemberAttendance = createAction('[Attendance] Load Member Attendance', props<{ memberId: string }>());
export const loadMemberAttendanceSuccess = createAction('[Attendance] Load Member Attendance Success', props<{ records: Attendance[] }>());
export const loadMemberAttendanceFailure = createAction('[Attendance] Load Member Attendance Failure', props<{ error: any }>());

export const loadAllAttendance = createAction('[Attendance] Load All Attendance');
export const loadAllAttendanceSuccess = createAction('[Attendance] Load All Attendance Success', props<{ records: Attendance[] }>());
export const loadAllAttendanceFailure = createAction('[Attendance] Load All Attendance Failure', props<{ error: any }>());

// Scanner Actions
export const startScan = createAction('[Attendance] Start Scan');
export const scanSuccess = createAction('[Attendance] Scan Success', props<{ data: string }>());
export const scanFailure = createAction('[Attendance] Scan Failure', props<{ error: string }>());
export const stopScan = createAction('[Attendance] Stop Scan');
