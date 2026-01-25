import { createAction, props } from '@ngrx/store';
import { WorkoutPlan, WorkoutPlansResponse, WorkoutDay, WorkoutExercise, AssignedWorkoutPlan } from '../../models/workout-plan.model';

// Load Plans
export const loadWorkoutPlans = createAction('[Workout Plans] Load Plans', props<{ params: any }>());
export const loadWorkoutPlansSuccess = createAction('[Workout Plans] Load Plans Success', props<{ response: WorkoutPlansResponse }>());
export const loadWorkoutPlansFailure = createAction('[Workout Plans] Load Plans Failure', props<{ error: any }>());

// Load Single Plan
export const loadWorkoutPlan = createAction('[Workout Plans] Load Plan', props<{ id: string }>());
export const loadWorkoutPlanSuccess = createAction('[Workout Plans] Load Plan Success', props<{ plan: any }>()); // plan + details
export const loadWorkoutPlanFailure = createAction('[Workout Plans] Load Plan Failure', props<{ error: any }>());

// Create Plan
export const createWorkoutPlan = createAction('[Workout Plans] Create Plan', props<{ plan: Partial<WorkoutPlan> }>());
export const createWorkoutPlanSuccess = createAction('[Workout Plans] Create Plan Success', props<{ plan: WorkoutPlan }>());
export const createWorkoutPlanFailure = createAction('[Workout Plans] Create Plan Failure', props<{ error: any }>());

// Delete Plan
export const deleteWorkoutPlan = createAction('[Workout Plans] Delete Plan', props<{ id: string }>());
export const deleteWorkoutPlanSuccess = createAction('[Workout Plans] Delete Plan Success', props<{ id: string }>());
export const deleteWorkoutPlanFailure = createAction('[Workout Plans] Delete Plan Failure', props<{ error: any }>());

// Days & Exercises
export const addWorkoutDays = createAction('[Workout Plans] Add Days', props<{ planId: string, daysStructure: any }>());
export const addWorkoutDaysSuccess = createAction('[Workout Plans] Add Days Success', props<{ days: WorkoutDay[] }>());
export const addWorkoutDaysFailure = createAction('[Workout Plans] Add Days Failure', props<{ error: any }>());

// Assignment
// Builder
export const setBuilderStep = createAction('[Workout Plans] Set Builder Step', props<{ step: number }>());
export const resetBuilder = createAction('[Workout Plans] Reset Builder');

// Exercises
export const addExercisesToDay = createAction('[Workout Plans] Add Exercises To Day', props<{ dayId: string, dto: any }>());
export const addExercisesToDaySuccess = createAction('[Workout Plans] Add Exercises To Day Success', props<{ exercises: WorkoutExercise[] }>());
export const addExercisesToDayFailure = createAction('[Workout Plans] Add Exercises To Day Failure', props<{ error: any }>());

export const assignWorkoutPlan = createAction('[Workout Plans] Assign Plan', props<{ assignment: { memberId: string; workoutPlanId: string; startDate: Date; endDate?: Date } }>());
export const assignWorkoutPlanSuccess = createAction('[Workout Plans] Assign Plan Success', props<{ assignment: AssignedWorkoutPlan }>());
export const assignWorkoutPlanFailure = createAction('[Workout Plans] Assign Plan Failure', props<{ error: any }>());
