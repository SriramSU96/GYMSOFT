import { createAction, props } from '@ngrx/store';
import { GymKPIs, RetentionRate, PeakHours, TrainerPerformance, AdvancedAnalytics, FinancialReport } from '../../models/analytics.model';

// Overview
export const loadOverview = createAction('[Analytics] Load Overview');
export const loadOverviewSuccess = createAction(
    '[Analytics] Load Overview Success',
    props<{ kpis: GymKPIs }>()
);
export const loadOverviewFailure = createAction(
    '[Analytics] Load Overview Failure',
    props<{ error: any }>()
);

// Specific Widgets
export const loadRetention = createAction('[Analytics] Load Retention');
export const loadRetentionSuccess = createAction(
    '[Analytics] Load Retention Success',
    props<{ retention: RetentionRate }>()
);
export const loadRetentionFailure = createAction(
    '[Analytics] Load Retention Failure',
    props<{ error: any }>()
);

export const loadPeakHours = createAction('[Analytics] Load Peak Hours');
export const loadPeakHoursSuccess = createAction(
    '[Analytics] Load Peak Hours Success',
    props<{ peakHours: PeakHours }>()
);
export const loadPeakHoursFailure = createAction(
    '[Analytics] Load Peak Hours Failure',
    props<{ error: any }>()
);

export const loadTrainerPerformance = createAction('[Analytics] Load Trainer Performance');
export const loadTrainerPerformanceSuccess = createAction(
    '[Analytics] Load Trainer Performance Success',
    props<{ performance: TrainerPerformance[] }>()
);
export const loadTrainerPerformanceFailure = createAction(
    '[Analytics] Load Trainer Performance Failure',
    props<{ error: any }>()
);

// Advanced
export const loadAdvancedAnalytics = createAction(
    '[Analytics] Load Advanced Analytics',
    props<{ period: 'week' | 'month' | 'year' }>()
);
export const loadAdvancedAnalyticsSuccess = createAction(
    '[Analytics] Load Advanced Analytics Success',
    props<{ analytics: AdvancedAnalytics }>()
);
export const loadAdvancedAnalyticsFailure = createAction(
    '[Analytics] Load Advanced Analytics Failure',
    props<{ error: any }>()
);
