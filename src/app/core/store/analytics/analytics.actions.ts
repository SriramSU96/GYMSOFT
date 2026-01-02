
import { createAction, props } from '@ngrx/store';
import { GymKPIs, RetentionRate, PeakHours, TrainerPerformance, AdvancedAnalytics, FinancialReport } from '../../models/analytics.model';

export const loadAnalytics = createAction('[Analytics] Load Analytics');
export const loadOverview = createAction('[Analytics] Load Overview');
export const loadOverviewSuccess = createAction('[Analytics] Load Overview Success', props<{ kpis: GymKPIs }>());
export const loadOverviewFailure = createAction('[Analytics] Load Overview Failure', props<{ error: any }>());

// Advanced Analytics Actions
export const loadAdvancedAnalytics = createAction('[Analytics] Load Advanced Analytics', props<{ filter?: string }>());
export const loadAdvancedAnalyticsSuccess = createAction('[Analytics] Load Advanced Analytics Success', props<{ data: AdvancedAnalytics }>());
export const loadAdvancedAnalyticsFailure = createAction('[Analytics] Load Advanced Analytics Failure', props<{ error: any }>());

// Financial Report Actions
export const loadFinancialReport = createAction('[Analytics] Load Financial Report', props<{ month: string }>());
export const loadFinancialReportSuccess = createAction('[Analytics] Load Financial Report Success', props<{ report: FinancialReport }>());
export const loadFinancialReportFailure = createAction('[Analytics] Load Financial Report Failure', props<{ error: any }>());
