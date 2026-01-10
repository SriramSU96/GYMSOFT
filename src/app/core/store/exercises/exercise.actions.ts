import { createAction, props } from '@ngrx/store';
import { Exercise, ExerciseFilters, CreateExerciseDto, UpdateExerciseDto } from '../../models/exercise.model';

// Load Exercises with Filters
export const loadExercises = createAction(
    '[Exercise] Load Exercises',
    props<{ filters?: ExerciseFilters; pageSize?: number; pageNumber?: number }>()
);
export const loadExercisesSuccess = createAction(
    '[Exercise] Load Exercises Success',
    props<{ exercises: Exercise[]; page: number; pages: number; total: number }>()
);
export const loadExercisesFailure = createAction(
    '[Exercise] Load Exercises Failure',
    props<{ error: any }>()
);

// Load Single Exercise
export const loadExercise = createAction(
    '[Exercise] Load Exercise',
    props<{ id: string }>()
);
export const loadExerciseSuccess = createAction(
    '[Exercise] Load Exercise Success',
    props<{ exercise: Exercise }>()
);
export const loadExerciseFailure = createAction(
    '[Exercise] Load Exercise Failure',
    props<{ error: any }>()
);

// Create Exercise
export const createExercise = createAction(
    '[Exercise] Create Exercise',
    props<{ exercise: CreateExerciseDto }>()
);
export const createExerciseSuccess = createAction(
    '[Exercise] Create Exercise Success',
    props<{ exercise: Exercise }>()
);
export const createExerciseFailure = createAction(
    '[Exercise] Create Exercise Failure',
    props<{ error: any }>()
);

// Update Exercise
export const updateExercise = createAction(
    '[Exercise] Update Exercise',
    props<{ id: string; changes: UpdateExerciseDto }>()
);
export const updateExerciseSuccess = createAction(
    '[Exercise] Update Exercise Success',
    props<{ exercise: Exercise }>()
);
export const updateExerciseFailure = createAction(
    '[Exercise] Update Exercise Failure',
    props<{ error: any }>()
);

// Activate Exercise
export const activateExercise = createAction(
    '[Exercise] Activate Exercise',
    props<{ id: string }>()
);
export const activateExerciseSuccess = createAction(
    '[Exercise] Activate Exercise Success',
    props<{ exercise: Exercise }>()
);
export const activateExerciseFailure = createAction(
    '[Exercise] Activate Exercise Failure',
    props<{ error: any }>()
);

// Deactivate Exercise
export const deactivateExercise = createAction(
    '[Exercise] Deactivate Exercise',
    props<{ id: string }>()
);
export const deactivateExerciseSuccess = createAction(
    '[Exercise] Deactivate Exercise Success',
    props<{ exercise: Exercise }>()
);
export const deactivateExerciseFailure = createAction(
    '[Exercise] Deactivate Exercise Failure',
    props<{ error: any }>()
);

// Delete Exercise
export const deleteExercise = createAction(
    '[Exercise] Delete Exercise',
    props<{ id: string }>()
);
export const deleteExerciseSuccess = createAction(
    '[Exercise] Delete Exercise Success',
    props<{ id: string }>()
);
export const deleteExerciseFailure = createAction(
    '[Exercise] Delete Exercise Failure',
    props<{ error: any }>()
);

// Set Filters
export const setExerciseFilters = createAction(
    '[Exercise] Set Filters',
    props<{ filters: ExerciseFilters }>()
);

// Clear Selected Exercise
export const clearSelectedExercise = createAction('[Exercise] Clear Selected Exercise');
