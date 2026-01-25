import { createReducer, on } from '@ngrx/store';
import * as ReportActions from './report.actions';
import { ProfitLoss, YearlySummary, MemberReport, AttendanceReport } from '../../models/report.model';

export interface ReportState {
    profitLoss: ProfitLoss | null;
    yearlySummary: YearlySummary | null;
    memberReport: MemberReport | null;
    attendanceReport: AttendanceReport | null;
    loading: {
        financial: boolean;
        member: boolean;
        attendance: boolean;
        download: boolean;
    };
    error: any;
}

export const initialState: ReportState = {
    profitLoss: null,
    yearlySummary: null,
    memberReport: null,
    attendanceReport: null,
    loading: {
        financial: false,
        member: false,
        attendance: false,
        download: false
    },
    error: null
};

export const reportReducer = createReducer(
    initialState,

    // Financial
    on(ReportActions.loadProfitLoss, ReportActions.loadYearlySummary, state => ({
        ...state, loading: { ...state.loading, financial: true }, error: null
    })),
    on(ReportActions.loadProfitLossSuccess, (state, { data }) => ({
        ...state, profitLoss: data, loading: { ...state.loading, financial: false }
    })),
    on(ReportActions.loadYearlySummarySuccess, (state, { data }) => ({
        ...state, yearlySummary: data, loading: { ...state.loading, financial: false }
    })),
    on(ReportActions.loadProfitLossFailure, ReportActions.loadYearlySummaryFailure, (state, { error }) => ({
        ...state, loading: { ...state.loading, financial: false }, error
    })),

    // Member Report
    on(ReportActions.generateMemberReport, state => ({
        ...state, loading: { ...state.loading, member: true }, error: null
    })),
    on(ReportActions.generateMemberReportSuccess, (state, { data }) => ({
        ...state, memberReport: data, loading: { ...state.loading, member: false }
    })),
    on(ReportActions.generateMemberReportFailure, (state, { error }) => ({
        ...state, loading: { ...state.loading, member: false }, error
    })),

    // Attendance Report
    on(ReportActions.generateAttendanceReport, state => ({
        ...state, loading: { ...state.loading, attendance: true }, error: null
    })),
    on(ReportActions.generateAttendanceReportSuccess, (state, { data }) => ({
        ...state, attendanceReport: data, loading: { ...state.loading, attendance: false }
    })),
    on(ReportActions.generateAttendanceReportFailure, (state, { error }) => ({
        ...state, loading: { ...state.loading, attendance: false }, error
    })),

    // Download
    on(ReportActions.downloadReport, state => ({
        ...state, loading: { ...state.loading, download: true }, error: null
    })),
    on(ReportActions.downloadReportSuccess, state => ({
        ...state, loading: { ...state.loading, download: false }
    })),
    on(ReportActions.downloadReportFailure, (state, { error }) => ({
        ...state, loading: { ...state.loading, download: false }, error
    }))
);
