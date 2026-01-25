import { createAction, props } from '@ngrx/store';
import { Staff, StaffListResponse, StaffAttendance, StaffSalaryConfig, StaffSalaryRecord } from '../../models/staff.model';

// Load Staff
export const loadStaff = createAction('[Staff] Load Staff', props<{ params?: any }>());
export const loadStaffSuccess = createAction('[Staff] Load Staff Success', props<{ response: StaffListResponse }>());
export const loadStaffFailure = createAction('[Staff] Load Staff Failure', props<{ error: any }>());

// Load Single Staff
export const loadStaffMember = createAction('[Staff] Load Staff Member', props<{ id: string }>());
export const loadStaffMemberSuccess = createAction('[Staff] Load Staff Member Success', props<{ staff: Staff }>());
export const loadStaffMemberFailure = createAction('[Staff] Load Staff Member Failure', props<{ error: any }>());

// Create Staff
export const createStaff = createAction('[Staff] Create Staff', props<{ staff: Partial<Staff> }>());
export const createStaffSuccess = createAction('[Staff] Create Staff Success', props<{ staff: Staff }>());
export const createStaffFailure = createAction('[Staff] Create Staff Failure', props<{ error: any }>());

// Update Staff
export const updateStaff = createAction('[Staff] Update Staff', props<{ id: string, staff: Partial<Staff> }>());
export const updateStaffSuccess = createAction('[Staff] Update Staff Success', props<{ staff: Staff }>());
export const updateStaffFailure = createAction('[Staff] Update Staff Failure', props<{ error: any }>());

// Delete Staff
export const deleteStaff = createAction('[Staff] Delete Staff', props<{ id: string }>());
export const deleteStaffSuccess = createAction('[Staff] Delete Staff Success', props<{ id: string }>());
export const deleteStaffFailure = createAction('[Staff] Delete Staff Failure', props<{ error: any }>());

// Attendance
export const markStaffAttendance = createAction('[Staff] Mark Attendance', props<{ attendance: Partial<StaffAttendance> }>());
export const markAttendance = markStaffAttendance; // Alias
export const markAttendanceSuccess = createAction('[Staff] Mark Attendance Success', props<{ attendance: StaffAttendance }>());
export const markAttendanceFailure = createAction('[Staff] Mark Attendance Failure', props<{ error: any }>());

export const loadStaffAttendance = createAction('[Staff] Load Attendance', props<{ date?: string }>());
export const loadStaffAttendanceSuccess = createAction('[Staff] Load Attendance Success', props<{ attendance: StaffAttendance[] }>());
export const loadStaffAttendanceFailure = createAction('[Staff] Load Attendance Failure', props<{ error: any }>());

// Salary
export const generateSalary = createAction('[Staff] Generate Salary', props<{ month: number, year: number, staffIds?: string[] }>());
export const generateSalarySuccess = createAction('[Staff] Generate Salary Success', props<{ records: StaffSalaryRecord[] }>());
export const generateSalaryFailure = createAction('[Staff] Generate Salary Failure', props<{ error: any }>());

export const loadSalaries = createAction('[Staff] Load Salary Records', props<{ params: { month?: number, year?: number, status?: string } }>());
export const loadSalaryRecords = loadSalaries; // Alias
export const loadSalaryRecordsSuccess = createAction('[Staff] Load Salary Records Success', props<{ records: StaffSalaryRecord[] }>());
export const loadSalaryRecordsFailure = createAction('[Staff] Load Salary Records Failure', props<{ error: any }>());
