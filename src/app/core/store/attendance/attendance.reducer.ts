import { createReducer, on } from '@ngrx/store';
import * as AttendanceActions from './attendance.actions';
import { Attendance } from '../../models/attendance.model';

export interface AttendanceState {
    records: Attendance[];
    isLoading: boolean;
    isScanning: boolean;
    scanSuccess: boolean;
    scannedData: string | null;
    statusMessage: string;
    error: any;
}

export const initialState: AttendanceState = {
    records: [],
    isLoading: false,
    isScanning: false,
    scanSuccess: false,
    scannedData: null,
    statusMessage: 'Ready to Scan',
    error: null
};

export const attendanceReducer = createReducer(
    initialState,
    on(AttendanceActions.qrCheckIn, AttendanceActions.syncAttendance, AttendanceActions.loadMemberAttendance, AttendanceActions.loadAllAttendance, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(AttendanceActions.loadMemberAttendanceSuccess, AttendanceActions.loadAllAttendanceSuccess, (state, { records }) => ({
        ...state,
        records,
        isLoading: false
    })),
    on(AttendanceActions.qrCheckInSuccess, (state, { record }) => ({
        ...state,
        records: [...state.records, record],
        isLoading: false,
        isScanning: false,
        scanSuccess: true,
        statusMessage: `Check-in Successful for ${record.memberId}`
    })),
    on(AttendanceActions.syncAttendanceSuccess, (state) => ({
        ...state,
        isLoading: false
    })),
    on(
        AttendanceActions.qrCheckInFailure,
        AttendanceActions.syncAttendanceFailure,
        AttendanceActions.loadMemberAttendanceFailure,
        AttendanceActions.loadAllAttendanceFailure,
        (state, { error }) => ({
            ...state,
            isLoading: false,
            isScanning: false,
            scanSuccess: false,
            statusMessage: typeof error === 'string' ? error : 'Check-in Failed. Please try again.',
            error
        })
    ),
    // Scanner handling
    on(AttendanceActions.startScan, (state) => ({
        ...state,
        isScanning: true,
        scanSuccess: false,
        statusMessage: 'Camera Active...'
    })),
    on(AttendanceActions.scanSuccess, (state, { data }) => ({
        ...state,
        // We don't set scanSuccess true here anymore, wait for qrCheckInSuccess
        scannedData: data,
        statusMessage: `Scanned member: ${data}. Verifying...`
    })),
    on(AttendanceActions.scanFailure, (state, { error }) => ({
        ...state,
        isScanning: false,
        scanSuccess: false,
        statusMessage: error
    })),
    on(AttendanceActions.stopScan, (state) => ({
        ...state,
        isScanning: false,
        statusMessage: 'Ready to Scan'
    }))
);
