
import { createReducer, on } from '@ngrx/store';
import * as StaffActions from './staff.actions';
import { Staff, StaffAttendance, Salary } from '../../models/staff.model';

export interface StaffState {
    staffList: Staff[];
    staffAttendance: StaffAttendance[];
    salaries: Salary[];
    isLoading: boolean;
    error: any;
}

export const initialState: StaffState = {
    staffList: [],
    staffAttendance: [],
    salaries: [],
    isLoading: false,
    error: null
};

export const staffReducer = createReducer(
    initialState,
    on(StaffActions.loadStaff, StaffActions.addStaff, StaffActions.loadStaffAttendance, StaffActions.loadSalaries, (state) => ({ ...state, isLoading: true })),
    on(StaffActions.loadStaffSuccess, (state, { staff }) => ({ ...state, staffList: staff, isLoading: false })),
    on(StaffActions.addStaffSuccess, (state, { staff }) => ({ ...state, staffList: [...state.staffList, staff], isLoading: false })),
    on(StaffActions.loadStaffAttendanceSuccess, (state, { attendance }) => ({ ...state, staffAttendance: attendance, isLoading: false })),
    on(StaffActions.markStaffAttendanceSuccess, (state, { attendance }) => ({
        ...state,
        staffAttendance: [...state.staffAttendance.filter(a => a.staffId !== attendance.staffId || a.date !== attendance.date), attendance],
        isLoading: false
    })),
    on(StaffActions.loadSalariesSuccess, (state, { salaries }) => ({ ...state, salaries: salaries, isLoading: false })),
    on(
        StaffActions.loadStaffFailure,
        StaffActions.addStaffFailure,
        StaffActions.loadStaffAttendanceFailure,
        StaffActions.markStaffAttendanceFailure,
        StaffActions.loadSalariesFailure,
        (state, { error }) => ({ ...state, isLoading: false, error })
    )
);
