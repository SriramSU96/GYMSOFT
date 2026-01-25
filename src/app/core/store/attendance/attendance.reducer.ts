import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Attendance, AttendanceStats } from '../../models/attendance.model';
import * as AttendanceActions from './attendance.actions';

export interface AttendanceState extends EntityState<Attendance> {
    loading: boolean;
    error: any;
    stats: AttendanceStats | null;
    total: number;
}

export const adapter: EntityAdapter<Attendance> = createEntityAdapter<Attendance>({
    selectId: (a) => a._id || ''
});

export const initialState: AttendanceState = adapter.getInitialState({
    loading: false,
    error: null,
    stats: null,
    total: 0
});

export const attendanceReducer = createReducer(
    initialState,

    // Load
    on(AttendanceActions.loadAttendance, (state) => ({ ...state, loading: true, error: null })),
    on(AttendanceActions.loadAttendanceSuccess, (state, { response }) =>
        adapter.setAll(response.data, { ...state, loading: false, total: response.count || 0 })
    ),
    on(AttendanceActions.loadAttendanceFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // Add / Mark / Check-In
    on(AttendanceActions.markAttendance,
        AttendanceActions.checkIn,
        AttendanceActions.qrCheckIn,
        (state) => ({ ...state, loading: true, error: null })),

    on(AttendanceActions.markAttendanceSuccess,
        AttendanceActions.checkInSuccess,
        AttendanceActions.qrCheckInSuccess,
        (state, { attendance }) => adapter.addOne(attendance, { ...state, loading: false })
    ),

    on(AttendanceActions.markAttendanceFailure,
        AttendanceActions.checkInFailure,
        AttendanceActions.qrCheckInFailure,
        (state, { error }) => ({ ...state, loading: false, error })),

    // Check-Out
    on(AttendanceActions.checkOut, (state) => ({ ...state, loading: true, error: null })),
    on(AttendanceActions.checkOutSuccess, (state, { update }) =>
        adapter.updateOne(update, { ...state, loading: false })
    ),
    on(AttendanceActions.checkOutFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // Stats
    on(AttendanceActions.loadAttendanceStats, (state) => ({ ...state, loading: true })),
    on(AttendanceActions.loadAttendanceStatsSuccess, (state, { stats }) => ({ ...state, loading: false, stats })),
    on(AttendanceActions.loadAttendanceStatsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
