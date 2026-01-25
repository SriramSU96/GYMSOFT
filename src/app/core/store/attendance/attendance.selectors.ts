import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AttendanceState, selectAll, selectEntities, selectTotal } from './attendance.reducer';

export const selectAttendanceState = createFeatureSelector<AttendanceState>('attendance');

export const selectAllAttendance = createSelector(
    selectAttendanceState,
    selectAll
);

export const selectAttendanceEntities = createSelector(
    selectAttendanceState,
    selectEntities
);

export const selectAttendanceTotal = createSelector(
    selectAttendanceState,
    selectTotal
);

export const selectAttendanceLoading = createSelector(
    selectAttendanceState,
    (state) => state.loading
);

export const selectAttendanceError = createSelector(
    selectAttendanceState,
    (state) => state.error
);

export const selectAttendanceStats = createSelector(
    selectAttendanceState,
    (state) => state.stats
);
