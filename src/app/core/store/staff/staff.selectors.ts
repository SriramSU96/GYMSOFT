
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StaffState } from './staff.reducer';

export const selectStaffState = createFeatureSelector<StaffState>('staff');

export const selectStaff = createSelector(selectStaffState, (state) => state.staffList);
export const selectStaffList = createSelector(selectStaffState, (state) => state.staffList);
export const selectStaffAttendance = createSelector(selectStaffState, (state) => state.staffAttendance);
export const selectSalaries = createSelector(selectStaffState, (state) => state.salaries);
export const selectStaffIsLoading = createSelector(selectStaffState, (state) => state.isLoading);
export const selectStaffError = createSelector(selectStaffState, (state) => state.error);

export const selectSalarySummary = createSelector(
    selectSalaries,
    (salaries) => {
        const total = salaries.reduce((sum, s) => sum + s.amount, 0);
        const paid = salaries.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.amount, 0);
        const pending = salaries.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.amount, 0);
        return { total, paid, pending };
    }
);
