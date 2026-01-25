import { createReducer, on } from '@ngrx/store';
import * as AnalyticsActions from './analytics.actions';
import { GymKPIs, RetentionRate, PeakHours, TrainerPerformance, AdvancedAnalytics } from '../../models/analytics.model';

export interface AnalyticsState {
    overview: GymKPIs | null;
    retention: RetentionRate | null;
    peakHours: PeakHours | null;
    trainerPerformance: TrainerPerformance[];
    advancedAnalytics: AdvancedAnalytics | null;
    loading: {
        overview: boolean;
        retention: boolean;
        peakHours: boolean;
        trainers: boolean;
        advanced: boolean;
    };
    error: any;
}

export const initialState: AnalyticsState = {
    overview: null,
    retention: null,
    peakHours: null,
    trainerPerformance: [],
    advancedAnalytics: null,
    loading: {
        overview: false,
        retention: false,
        peakHours: false,
        trainers: false,
        advanced: false
    },
    error: null
};

export const analyticsReducer = createReducer(
    initialState,

    // Overview
    on(AnalyticsActions.loadOverview, state => ({
        ...state, loading: { ...state.loading, overview: true }, error: null
    })),
    on(AnalyticsActions.loadOverviewSuccess, (state, { kpis }) => ({
        ...state, overview: kpis, loading: { ...state.loading, overview: false }
    })),
    on(AnalyticsActions.loadOverviewFailure, (state, { error }) => ({
        ...state, loading: { ...state.loading, overview: false }, error
    })),

    // Retention
    on(AnalyticsActions.loadRetention, state => ({
        ...state, loading: { ...state.loading, retention: true }, error: null
    })),
    on(AnalyticsActions.loadRetentionSuccess, (state, { retention }) => ({
        ...state, retention, loading: { ...state.loading, retention: false }
    })),
    on(AnalyticsActions.loadRetentionFailure, (state, { error }) => ({
        ...state, loading: { ...state.loading, retention: false }, error
    })),

    // Peak Hours
    on(AnalyticsActions.loadPeakHours, state => ({
        ...state, loading: { ...state.loading, peakHours: true }, error: null
    })),
    on(AnalyticsActions.loadPeakHoursSuccess, (state, { peakHours }) => ({
        ...state, peakHours, loading: { ...state.loading, peakHours: false }
    })),
    on(AnalyticsActions.loadPeakHoursFailure, (state, { error }) => ({
        ...state, loading: { ...state.loading, peakHours: false }, error
    })),

    // Trainers
    on(AnalyticsActions.loadTrainerPerformance, state => ({
        ...state, loading: { ...state.loading, trainers: true }, error: null
    })),
    on(AnalyticsActions.loadTrainerPerformanceSuccess, (state, { performance }) => ({
        ...state, trainerPerformance: performance, loading: { ...state.loading, trainers: false }
    })),
    on(AnalyticsActions.loadTrainerPerformanceFailure, (state, { error }) => ({
        ...state, loading: { ...state.loading, trainers: false }, error
    })),

    // Advanced
    on(AnalyticsActions.loadAdvancedAnalytics, state => ({
        ...state, loading: { ...state.loading, advanced: true }, error: null
    })),
    on(AnalyticsActions.loadAdvancedAnalyticsSuccess, (state, { analytics }) => ({
        ...state, advancedAnalytics: analytics, loading: { ...state.loading, advanced: false }
    })),
    on(AnalyticsActions.loadAdvancedAnalyticsFailure, (state, { error }) => ({
        ...state, loading: { ...state.loading, advanced: false }, error
    }))
);
