import { createAction, props } from '@ngrx/store';
import { ProfitLoss, YearlySummary, ReportFilter, MemberReport, AttendanceReport } from '../../models/report.model';

// Financial Only
export const loadProfitLoss = createAction('[Report] Load Profit Loss');
export const loadProfitLossSuccess = createAction(
    '[Report] Load Profit Loss Success',
    props<{ data: ProfitLoss }>()
);
export const loadProfitLossFailure = createAction(
    '[Report] Load Profit Loss Failure',
    props<{ error: any }>()
);

export const loadYearlySummary = createAction(
    '[Report] Load Yearly Summary',
    props<{ year?: number }>()
);
export const loadYearlySummarySuccess = createAction(
    '[Report] Load Yearly Summary Success',
    props<{ data: YearlySummary }>()
);
export const loadYearlySummaryFailure = createAction(
    '[Report] Load Yearly Summary Failure',
    props<{ error: any }>()
);

// General Report Loading
export const generateMemberReport = createAction(
    '[Report] Generate Member Report',
    props<{ filter: ReportFilter }>()
);
export const generateMemberReportSuccess = createAction(
    '[Report] Generate Member Report Success',
    props<{ data: MemberReport }>()
);
export const generateMemberReportFailure = createAction(
    '[Report] Generate Member Report Failure',
    props<{ error: any }>()
);

export const generateAttendanceReport = createAction(
    '[Report] Generate Attendance Report',
    props<{ filter: ReportFilter }>()
);
export const generateAttendanceReportSuccess = createAction(
    '[Report] Generate Attendance Report Success',
    props<{ data: AttendanceReport }>()
);
export const generateAttendanceReportFailure = createAction(
    '[Report] Generate Attendance Report Failure',
    props<{ error: any }>()
);

// Download
export const downloadReport = createAction(
    '[Report] Download Report',
    props<{ reportType: 'Financial' | 'Attendance' | 'Member' | 'Inventory'; filter: ReportFilter; format: 'PDF' | 'CSV' | 'Excel' }>()
);
export const downloadReportSuccess = createAction('[Report] Download Report Success');
export const downloadReportFailure = createAction(
    '[Report] Download Report Failure',
    props<{ error: any }>()
);
