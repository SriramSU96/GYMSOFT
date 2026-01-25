import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as StaffActions from './staff.actions';
import { Staff, StaffAttendance, StaffSalaryRecord } from '../../models/staff.model';

export interface StaffState extends EntityState<Staff> {
    selectedStaff: Staff | null;
    attendance: StaffAttendance[];
    salaryRecords: StaffSalaryRecord[];
    isLoading: boolean;
    error: any;
}

export const adapter: EntityAdapter<Staff> = createEntityAdapter<Staff>({
    selectId: (staff: Staff) => staff._id,
    sortComparer: false
});

export const initialState: StaffState = adapter.getInitialState({
    selectedStaff: null,
    attendance: [],
    salaryRecords: [],
    isLoading: false,
    error: null
});

export const staffReducer = createReducer(
    initialState,

    // Load Staff
    on(StaffActions.loadStaff, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(StaffActions.loadStaffSuccess, (state, { response }) => {
        return adapter.setAll(response.staff, {
            ...state,
            isLoading: false
        });
    }),
    on(StaffActions.loadStaffFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),

    // Load Single Staff
    on(StaffActions.loadStaffMember, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(StaffActions.loadStaffMemberSuccess, (state, { staff }) => ({
        ...state,
        selectedStaff: staff,
        isLoading: false
    })),

    // CRUD
    on(StaffActions.createStaffSuccess, (state, { staff }) => adapter.addOne(staff, state)),
    on(StaffActions.updateStaffSuccess, (state, { staff }) => adapter.updateOne({ id: staff._id, changes: staff }, state)),
    on(StaffActions.deleteStaffSuccess, (state, { id }) => adapter.removeOne(id, state)),

    // Attendance
    on(StaffActions.loadStaffAttendanceSuccess, (state, { attendance }) => ({
        ...state,
        attendance
    })),
    on(StaffActions.markAttendanceSuccess, (state, { attendance }) => ({
        ...state,
        attendance: [...state.attendance, attendance]
    })),

    // Salary
    on(StaffActions.loadSalaryRecordsSuccess, (state, { records }) => ({
        ...state,
        salaryRecords: records
    })),
    on(StaffActions.generateSalarySuccess, (state, { records }) => ({
        ...state,
        salaryRecords: [...state.salaryRecords, ...records]
    }))
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
