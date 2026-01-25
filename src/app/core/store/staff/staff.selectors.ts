import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StaffState, adapter } from './staff.reducer';

export const selectStaffState = createFeatureSelector<StaffState>('staff');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors(selectStaffState);

export const selectAllStaff = selectAll;

export const selectStaffLoading = createSelector(
    selectStaffState,
    (state) => state.isLoading
);

export const selectStaffError = createSelector(
    selectStaffState,
    (state) => state.error
);

export const selectSelectedStaff = createSelector(
    selectStaffState,
    (state) => state.selectedStaff
);

export const selectStaffAttendance = createSelector(
    selectStaffState,
    (state) => state.attendance
);

export const selectSalaryRecords = createSelector(
    selectStaffState,
    (state) => state.salaryRecords
);

export const selectSalarySummary = createSelector(
    selectStaffState,
    (state) => {
        const records = state.salaryRecords || [];
        return {
            totalPaid: records.filter(r => r.status === 'Paid').reduce((acc, r) => acc + (r.finalAmount || 0), 0),
            pendingCount: records.filter(r => r.status === 'Generated').length,
            processedCount: records.filter(r => r.status === 'Paid').length
        };
    }
);
