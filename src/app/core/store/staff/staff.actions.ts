
import { createAction, props } from '@ngrx/store';
import { Staff, Salary, StaffAttendance } from '../../models/staff.model';

export const loadStaff = createAction('[Staff] Load Staff');
export const loadStaffSuccess = createAction('[Staff] Load Staff Success', props<{ staff: Staff[] }>());
export const loadStaffFailure = createAction('[Staff] Load Staff Failure', props<{ error: any }>());

export const addStaff = createAction('[Staff] Add Staff', props<{ staff: Partial<Staff> }>());
export const addStaffSuccess = createAction('[Staff] Add Staff Success', props<{ staff: Staff }>());
export const addStaffFailure = createAction('[Staff] Add Staff Failure', props<{ error: any }>());

// Attendance
export const loadStaffAttendance = createAction('[Staff] Load Staff Attendance');
export const loadStaffAttendanceSuccess = createAction('[Staff] Load Staff Attendance Success', props<{ attendance: StaffAttendance[] }>());
export const loadStaffAttendanceFailure = createAction('[Staff] Load Staff Attendance Failure', props<{ error: any }>());

export const markStaffAttendance = createAction('[Staff] Mark Staff Attendance', props<{ staffId: string, status: 'present' | 'absent' | 'leave' }>());
export const markStaffAttendanceSuccess = createAction('[Staff] Mark Staff Attendance Success', props<{ attendance: StaffAttendance }>());
export const markStaffAttendanceFailure = createAction('[Staff] Mark Staff Attendance Failure', props<{ error: any }>());

// Salaries
export const loadSalaries = createAction('[Staff] Load Salaries');
export const loadSalariesSuccess = createAction('[Staff] Load Salaries Success', props<{ salaries: Salary[] }>());
export const loadSalariesFailure = createAction('[Staff] Load Salaries Failure', props<{ error: any }>());
