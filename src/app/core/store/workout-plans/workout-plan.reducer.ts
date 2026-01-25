import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as WorkoutPlanActions from './workout-plan.actions';
import { WorkoutPlan, WorkoutDay } from '../../models/workout-plan.model';

export interface WorkoutPlansState extends EntityState<WorkoutPlan> {
    selectedPlan: any | null; // Detailed plan with days/exercises
    isLoading: boolean;
    error: any;
    pagination: {
        total: number;
        page: number;
        pages: number;
        limit: number;
    } | null;
    filters: any;
    builder: {
        step: number;
        planId: string | null;
        days: WorkoutDay[];
    };
}

export const adapter: EntityAdapter<WorkoutPlan> = createEntityAdapter<WorkoutPlan>({
    selectId: (plan: WorkoutPlan) => plan._id,
    sortComparer: false
});

export const initialState: WorkoutPlansState = adapter.getInitialState({
    selectedPlan: null,
    isLoading: false,
    error: null,
    pagination: null,
    filters: {},
    builder: {
        step: 1,
        planId: null,
        days: []
    }
});

export const workoutPlanReducer = createReducer(
    initialState,

    // Load Plans
    on(WorkoutPlanActions.loadWorkoutPlans, (state, { params }) => ({
        ...state,
        isLoading: true,
        error: null,
        filters: params.filters || {}
    })),
    on(WorkoutPlanActions.loadWorkoutPlansSuccess, (state, { response }) => {
        return adapter.setAll(response.workoutPlans, {
            ...state,
            isLoading: false,
            pagination: response.pagination
        });
    }),
    on(WorkoutPlanActions.loadWorkoutPlansFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),

    // Load Single Plan
    on(WorkoutPlanActions.loadWorkoutPlan, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(WorkoutPlanActions.loadWorkoutPlanSuccess, (state, { plan }) => ({
        ...state,
        selectedPlan: plan,
        isLoading: false
    })),

    // Create
    on(WorkoutPlanActions.createWorkoutPlanSuccess, (state, { plan }) => adapter.addOne(plan, state)),

    // Delete
    on(WorkoutPlanActions.deleteWorkoutPlanSuccess, (state, { id }) => adapter.removeOne(id, state)),

    // Builder
    on(WorkoutPlanActions.setBuilderStep, (state, { step }) => ({
        ...state,
        builder: { ...state.builder, step }
    })),
    on(WorkoutPlanActions.resetBuilder, (state) => ({
        ...state,
        builder: {
            step: 1,
            planId: null,
            days: []
        }
    })),
    on(WorkoutPlanActions.createWorkoutPlanSuccess, (state, { plan }) => {
        const newState = adapter.addOne(plan, state);
        return {
            ...newState,
            builder: {
                ...state.builder,
                planId: plan._id,
                step: 2
            }
        };
    }),
    on(WorkoutPlanActions.addWorkoutDaysSuccess, (state, { days }) => ({
        ...state,
        builder: {
            ...state.builder,
            days,
            step: 3
        }
    }))
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
