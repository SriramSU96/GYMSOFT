import { createReducer, on } from '@ngrx/store';
import {
    WorkoutPlan,
    WorkoutPlanStructure,
    WorkoutPlanFilters,
    MemberWorkoutResponse,
    WorkoutDay
} from '../../models/workout-plan.model';
import * as WorkoutPlanActions from './workout-plan.actions';

export interface WorkoutPlanState {
    plans: WorkoutPlan[];
    selectedPlan: WorkoutPlanStructure | null;
    memberWorkout: MemberWorkoutResponse | null;
    filters: WorkoutPlanFilters;
    pagination: {
        page: number;
        pages: number;
        total: number;
    };
    builderState: {
        step: number;
        planId: string | null;
        days: WorkoutDay[];
    };
    loading: boolean;
    error: any;
}

export const initialState: WorkoutPlanState = {
    plans: [],
    selectedPlan: null,
    memberWorkout: null,
    filters: {},
    pagination: {
        page: 1,
        pages: 1,
        total: 0
    },
    builderState: {
        step: 1,
        planId: null,
        days: []
    },
    loading: false,
    error: null
};

export const workoutPlanReducer = createReducer(
    initialState,

    // ========================================
    // Load Plans
    // ========================================
    on(WorkoutPlanActions.loadPlans, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(WorkoutPlanActions.loadPlansSuccess, (state, { response }) => ({
        ...state,
        plans: response.plans,
        pagination: {
            page: response.page,
            pages: response.pages,
            total: response.total
        },
        loading: false,
        error: null
    })),

    on(WorkoutPlanActions.loadPlansFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // ========================================
    // Load Plan Structure
    // ========================================
    on(WorkoutPlanActions.loadPlanStructure, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(WorkoutPlanActions.loadPlanStructureSuccess, (state, { plan }) => ({
        ...state,
        selectedPlan: plan,
        loading: false,
        error: null
    })),

    on(WorkoutPlanActions.loadPlanStructureFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // ========================================
    // Create Plan
    // ========================================
    on(WorkoutPlanActions.createPlan, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(WorkoutPlanActions.createPlanSuccess, (state, { plan }) => ({
        ...state,
        builderState: {
            ...state.builderState,
            planId: plan._id || null,
            step: 2
        },
        loading: false,
        error: null
    })),

    on(WorkoutPlanActions.createPlanFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // ========================================
    // Add Days
    // ========================================
    on(WorkoutPlanActions.addDaysToPlan, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(WorkoutPlanActions.addDaysToPlanSuccess, (state, { days }) => ({
        ...state,
        builderState: {
            ...state.builderState,
            days,
            step: 3
        },
        loading: false,
        error: null
    })),

    on(WorkoutPlanActions.addDaysToPlanFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // ========================================
    // Add Exercises
    // ========================================
    on(WorkoutPlanActions.addExercisesToDay, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(WorkoutPlanActions.addExercisesToDaySuccess, (state, { dayId, exercises }) => ({
        ...state,
        builderState: {
            ...state.builderState,
            days: state.builderState.days.map(day =>
                day._id === dayId ? { ...day, exercises } : day
            )
        },
        loading: false,
        error: null
    })),

    on(WorkoutPlanActions.addExercisesToDayFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // ========================================
    // Update Plan
    // ========================================
    on(WorkoutPlanActions.updatePlan, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(WorkoutPlanActions.updatePlanSuccess, (state, { plan }) => ({
        ...state,
        plans: state.plans.map(p => p._id === plan._id ? plan : p),
        loading: false,
        error: null
    })),

    on(WorkoutPlanActions.updatePlanFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // ========================================
    // Delete Plan
    // ========================================
    on(WorkoutPlanActions.deletePlan, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(WorkoutPlanActions.deletePlanSuccess, (state, { planId }) => ({
        ...state,
        plans: state.plans.filter(p => p._id !== planId),
        loading: false,
        error: null
    })),

    on(WorkoutPlanActions.deletePlanFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // ========================================
    // Assign Plan
    // ========================================
    on(WorkoutPlanActions.assignPlan, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(WorkoutPlanActions.assignPlanSuccess, (state) => ({
        ...state,
        loading: false,
        error: null
    })),

    on(WorkoutPlanActions.assignPlanFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // ========================================
    // Load Member Workout
    // ========================================
    on(WorkoutPlanActions.loadMemberWorkout, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(WorkoutPlanActions.loadMemberWorkoutSuccess, (state, { response }) => ({
        ...state,
        memberWorkout: response,
        loading: false,
        error: null
    })),

    on(WorkoutPlanActions.loadMemberWorkoutFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // ========================================
    // Track Completion
    // ========================================
    on(WorkoutPlanActions.trackCompletion, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(WorkoutPlanActions.trackCompletionSuccess, (state) => ({
        ...state,
        loading: false,
        error: null
    })),

    on(WorkoutPlanActions.trackCompletionFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // ========================================
    // Filters
    // ========================================
    on(WorkoutPlanActions.setFilters, (state, { filters }) => ({
        ...state,
        filters
    })),

    on(WorkoutPlanActions.clearFilters, (state) => ({
        ...state,
        filters: {}
    })),

    // ========================================
    // Builder State
    // ========================================
    on(WorkoutPlanActions.setBuilderStep, (state, { step }) => ({
        ...state,
        builderState: {
            ...state.builderState,
            step
        }
    })),

    on(WorkoutPlanActions.resetBuilder, (state) => ({
        ...state,
        builderState: {
            step: 1,
            planId: null,
            days: []
        }
    })),

    on(WorkoutPlanActions.clearSelectedPlan, (state) => ({
        ...state,
        selectedPlan: null
    }))
);
