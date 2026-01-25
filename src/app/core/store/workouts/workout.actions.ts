import { createAction, props } from '@ngrx/store';
import { Exercise, ExercisesResponse } from '../../models/exercise.model';

// Load Exercises
export const loadExercises = createAction('[Exercises] Load Exercises', props<{ params: any }>());
export const loadExercisesSuccess = createAction('[Exercises] Load Exercises Success', props<{ response: ExercisesResponse }>());
export const loadExercisesFailure = createAction('[Exercises] Load Exercises Failure', props<{ error: any }>());

// Initialize Exercises (if used for lazy loading or single create needed separately)
export const createExercise = createAction('[Exercises] Create Exercise', props<{ exercise: Partial<Exercise> }>());
export const createExerciseSuccess = createAction('[Exercises] Create Exercise Success', props<{ exercise: Exercise }>());
export const createExerciseFailure = createAction('[Exercises] Create Exercise Failure', props<{ error: any }>());

// Update Exercise
export const updateExercise = createAction('[Exercises] Update Exercise', props<{ id: string, exercise: Partial<Exercise> }>());
export const updateExerciseSuccess = createAction('[Exercises] Update Exercise Success', props<{ exercise: Exercise }>());
export const updateExerciseFailure = createAction('[Exercises] Update Exercise Failure', props<{ error: any }>());

// Delete Exercise
export const deleteExercise = createAction('[Exercises] Delete Exercise', props<{ id: string }>());
export const deleteExerciseSuccess = createAction('[Exercises] Delete Exercise Success', props<{ id: string }>());
export const deleteExerciseFailure = createAction('[Exercises] Delete Exercise Failure', props<{ error: any }>());
