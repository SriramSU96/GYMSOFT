import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkoutPlansState, adapter } from './workout-plan.reducer';

export const selectWorkoutPlansState = createFeatureSelector<WorkoutPlansState>('workoutPlans');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors(selectWorkoutPlansState);

export const selectAllWorkoutPlans = selectAll;

export const selectWorkoutPlansLoading = createSelector(
    selectWorkoutPlansState,
    (state) => state.isLoading
);

export const selectWorkoutPlansError = createSelector(
    selectWorkoutPlansState,
    (state) => state.error
);

export const selectSelectedWorkoutPlan = createSelector(
    selectWorkoutPlansState,
    (state) => state.selectedPlan
);

// Removed old selectBuilderPlan and selectBuilderDays to avoid conflict

export const selectPagination = createSelector(
    selectWorkoutPlansState,
    (state) => state.pagination
);

export const selectFilters = createSelector(
    selectWorkoutPlansState,
    (state) => state.filters
);

export const selectBuilderStep = createSelector(
    selectWorkoutPlansState,
    (state) => state.builder.step
);

export const selectBuilderPlanId = createSelector(
    selectWorkoutPlansState,
    (state) => state.builder.planId
);

export const selectBuilderDays = createSelector(
    selectWorkoutPlansState,
    (state) => state.builder.days
);

export const selectLoading = selectWorkoutPlansLoading;
export const selectPlans = selectAllWorkoutPlans;
