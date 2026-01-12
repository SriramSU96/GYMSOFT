import { createAction, props } from '@ngrx/store';
import {
    WorkoutPlan,
    WorkoutDay,
    WorkoutExercise,
    AssignedWorkoutPlan,
    WorkoutCompletion,
    WorkoutPlanStructure,
    CreateWorkoutPlanDto,
    AddDaysDto,
    AddExercisesDto,
    AssignPlanDto,
    TrackCompletionDto,
    WorkoutPlanFilters,
    WorkoutPlanListResponse,
    MemberWorkoutResponse
} from '../../models/workout-plan.model';

// ========================================
// Load Plans
// ========================================
export const loadPlans = createAction(
    '[Workout Plans] Load Plans',
    props<{ filters?: WorkoutPlanFilters; pageNumber?: number; pageSize?: number }>()
);

export const loadPlansSuccess = createAction(
    '[Workout Plans] Load Plans Success',
    props<{ response: WorkoutPlanListResponse }>()
);

export const loadPlansFailure = createAction(
    '[Workout Plans] Load Plans Failure',
    props<{ error: any }>()
);

// ========================================
// Load Single Plan Structure
// ========================================
export const loadPlanStructure = createAction(
    '[Workout Plans] Load Plan Structure',
    props<{ planId: string }>()
);

export const loadPlanStructureSuccess = createAction(
    '[Workout Plans] Load Plan Structure Success',
    props<{ plan: WorkoutPlanStructure }>()
);

export const loadPlanStructureFailure = createAction(
    '[Workout Plans] Load Plan Structure Failure',
    props<{ error: any }>()
);

// ========================================
// Create Plan Workflow
// ========================================
export const createPlan = createAction(
    '[Workout Plans] Create Plan',
    props<{ dto: CreateWorkoutPlanDto }>()
);

export const createPlanSuccess = createAction(
    '[Workout Plans] Create Plan Success',
    props<{ plan: WorkoutPlan }>()
);

export const createPlanFailure = createAction(
    '[Workout Plans] Create Plan Failure',
    props<{ error: any }>()
);

export const addDaysToPlan = createAction(
    '[Workout Plans] Add Days to Plan',
    props<{ planId: string; dto: AddDaysDto }>()
);

export const addDaysToPlanSuccess = createAction(
    '[Workout Plans] Add Days to Plan Success',
    props<{ days: WorkoutDay[] }>()
);

export const addDaysToPlanFailure = createAction(
    '[Workout Plans] Add Days to Plan Failure',
    props<{ error: any }>()
);

export const addExercisesToDay = createAction(
    '[Workout Plans] Add Exercises to Day',
    props<{ dayId: string; dto: AddExercisesDto }>()
);

export const addExercisesToDaySuccess = createAction(
    '[Workout Plans] Add Exercises to Day Success',
    props<{ dayId: string; exercises: WorkoutExercise[] }>()
);

export const addExercisesToDayFailure = createAction(
    '[Workout Plans] Add Exercises to Day Failure',
    props<{ error: any }>()
);

// ========================================
// Update Plan
// ========================================
export const updatePlan = createAction(
    '[Workout Plans] Update Plan',
    props<{ planId: string; dto: Partial<CreateWorkoutPlanDto> }>()
);

export const updatePlanSuccess = createAction(
    '[Workout Plans] Update Plan Success',
    props<{ plan: WorkoutPlan }>()
);

export const updatePlanFailure = createAction(
    '[Workout Plans] Update Plan Failure',
    props<{ error: any }>()
);

// ========================================
// Delete Plan
// ========================================
export const deletePlan = createAction(
    '[Workout Plans] Delete Plan',
    props<{ planId: string }>()
);

export const deletePlanSuccess = createAction(
    '[Workout Plans] Delete Plan Success',
    props<{ planId: string }>()
);

export const deletePlanFailure = createAction(
    '[Workout Plans] Delete Plan Failure',
    props<{ error: any }>()
);

// ========================================
// Assign Plan to Member
// ========================================
export const assignPlan = createAction(
    '[Workout Plans] Assign Plan',
    props<{ dto: AssignPlanDto }>()
);

export const assignPlanSuccess = createAction(
    '[Workout Plans] Assign Plan Success',
    props<{ assignment: AssignedWorkoutPlan }>()
);

export const assignPlanFailure = createAction(
    '[Workout Plans] Assign Plan Failure',
    props<{ error: any }>()
);

// ========================================
// Load Member Workout
// ========================================
export const loadMemberWorkout = createAction(
    '[Workout Plans] Load Member Workout',
    props<{ memberId: string }>()
);

export const loadMemberWorkoutSuccess = createAction(
    '[Workout Plans] Load Member Workout Success',
    props<{ response: MemberWorkoutResponse }>()
);

export const loadMemberWorkoutFailure = createAction(
    '[Workout Plans] Load Member Workout Failure',
    props<{ error: any }>()
);

// ========================================
// Track Completion
// ========================================
export const trackCompletion = createAction(
    '[Workout Plans] Track Completion',
    props<{ dto: TrackCompletionDto }>()
);

export const trackCompletionSuccess = createAction(
    '[Workout Plans] Track Completion Success',
    props<{ completion: WorkoutCompletion }>()
);

export const trackCompletionFailure = createAction(
    '[Workout Plans] Track Completion Failure',
    props<{ error: any }>()
);

// ========================================
// Filters
// ========================================
export const setFilters = createAction(
    '[Workout Plans] Set Filters',
    props<{ filters: WorkoutPlanFilters }>()
);

export const clearFilters = createAction(
    '[Workout Plans] Clear Filters'
);

// ========================================
// Builder State
// ========================================
export const setBuilderStep = createAction(
    '[Workout Plans] Set Builder Step',
    props<{ step: number }>()
);

export const resetBuilder = createAction(
    '[Workout Plans] Reset Builder'
);

export const clearSelectedPlan = createAction(
    '[Workout Plans] Clear Selected Plan'
);
