
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AttendanceState } from './attendance.reducer';

export const selectAttendanceState = createFeatureSelector<AttendanceState>('attendance');

export const selectAttendanceRecords = createSelector(
    selectAttendanceState,
    (state) => state.records
);

export const selectAttendanceIsLoading = createSelector(
    selectAttendanceState,
    (state) => state.isLoading
);

export const selectIsScanning = createSelector(
    selectAttendanceState,
    (state) => state.isScanning
);

export const selectScanSuccess = createSelector(
    selectAttendanceState,
    (state) => state.scanSuccess
);

export const selectScannedData = createSelector(
    selectAttendanceState,
    (state) => state.scannedData
);

export const selectScannerStatus = createSelector(
    selectAttendanceState,
    (state) => state.statusMessage
);
