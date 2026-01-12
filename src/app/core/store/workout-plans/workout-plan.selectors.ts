import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkoutPlanState } from './workout-plan.reducer';

export const selectWorkoutPlanState = createFeatureSelector<WorkoutPlanState>('workoutPlans');

// Plans
export const selectPlans = createSelector(
    selectWorkoutPlanState,
    (state) => state.plans
);

export const selectSelectedPlan = createSelector(
    selectWorkoutPlanState,
    (state) => state.selectedPlan
);

export const selectMemberWorkout = createSelector(
    selectWorkoutPlanState,
    (state) => state.memberWorkout
);

// Filters & Pagination
export const selectFilters = createSelector(
    selectWorkoutPlanState,
    (state) => state.filters
);

export const selectPagination = createSelector(
    selectWorkoutPlanState,
    (state) => state.pagination
);

// Builder State
export const selectBuilderState = createSelector(
    selectWorkoutPlanState,
    (state) => state.builderState
);

export const selectBuilderStep = createSelector(
    selectBuilderState,
    (builder) => builder.step
);

export const selectBuilderPlanId = createSelector(
    selectBuilderState,
    (builder) => builder.planId
);

export const selectBuilderDays = createSelector(
    selectBuilderState,
    (builder) => builder.days
);

// Loading & Error
export const selectLoading = createSelector(
    selectWorkoutPlanState,
    (state) => state.loading
);

export const selectError = createSelector(
    selectWorkoutPlanState,
    (state) => state.error
);

// Filtered Plans
export const selectActivePlans = createSelector(
    selectPlans,
    (plans) => plans.filter(plan => plan.isActive)
);

export const selectInactivePlans = createSelector(
    selectPlans,
    (plans) => plans.filter(plan => !plan.isActive)
);
