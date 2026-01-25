import { createAction, props } from '@ngrx/store';
import { Attendance, AttendanceFilter, AttendanceResponse, AttendanceStats, CheckInPayload } from '../../models/attendance.model';
import { Update } from '@ngrx/entity';

// Load Attendance List
export const loadAttendance = createAction(
    '[Attendance] Load Attendance',
    props<{ filter?: AttendanceFilter }>()
);

export const loadAttendanceSuccess = createAction(
    '[Attendance] Load Attendance Success',
    props<{ response: AttendanceResponse }>()
);

export const loadAttendanceFailure = createAction(
    '[Attendance] Load Attendance Failure',
    props<{ error: any }>()
);

// Manual Add / Mark Attendance
export const markAttendance = createAction(
    '[Attendance] Mark Attendance',
    props<{ data: Partial<Attendance> }>()
);

export const markAttendanceSuccess = createAction(
    '[Attendance] Mark Attendance Success',
    props<{ attendance: Attendance }>()
);

export const markAttendanceFailure = createAction(
    '[Attendance] Mark Attendance Failure',
    props<{ error: any }>()
);

// Check-In (Manual)
export const checkIn = createAction(
    '[Attendance] Check In',
    props<{ data: CheckInPayload }>()
);

export const checkInSuccess = createAction(
    '[Attendance] Check In Success',
    props<{ attendance: Attendance }>()
);

export const checkInFailure = createAction(
    '[Attendance] Check In Failure',
    props<{ error: any }>()
);

// QR Check-In
export const qrCheckIn = createAction(
    '[Attendance] QR Check In',
    props<{ token: string }>()
);

export const qrCheckInSuccess = createAction(
    '[Attendance] QR Check In Success',
    props<{ attendance: Attendance }>()
);

export const qrCheckInFailure = createAction(
    '[Attendance] QR Check In Failure',
    props<{ error: any }>()
);

// Check-Out
export const checkOut = createAction(
    '[Attendance] Check Out',
    props<{ id: string; checkOutTime?: Date }>()
);

export const checkOutSuccess = createAction(
    '[Attendance] Check Out Success',
    props<{ update: Update<Attendance> }>()
);

export const checkOutFailure = createAction(
    '[Attendance] Check Out Failure',
    props<{ error: any }>()
);

// Load Stats
export const loadAttendanceStats = createAction(
    '[Attendance] Load Stats',
    props<{ date: string }>()
);

export const loadAttendanceStatsSuccess = createAction(
    '[Attendance] Load Stats Success',
    props<{ stats: AttendanceStats }>()
);

export const loadAttendanceStatsFailure = createAction(
    '[Attendance] Load Stats Failure',
    props<{ error: any }>()
);
