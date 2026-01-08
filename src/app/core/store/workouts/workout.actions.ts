import { createAction, props } from '@ngrx/store';
import { Workout } from '../../models/gym-extensions.model';

// Load Workouts
export const loadWorkouts = createAction('[Workout] Load Workouts');
export const loadWorkoutsSuccess = createAction(
    '[Workout] Load Workouts Success',
    props<{ workouts: Workout[] }>()
);
export const loadWorkoutsFailure = createAction(
    '[Workout] Load Workouts Failure',
    props<{ error: any }>()
);

// Load Single Workout
export const loadWorkout = createAction(
    '[Workout] Load Workout',
    props<{ id: string }>()
);
export const loadWorkoutSuccess = createAction(
    '[Workout] Load Workout Success',
    props<{ workout: Workout }>()
);
export const loadWorkoutFailure = createAction(
    '[Workout] Load Workout Failure',
    props<{ error: any }>()
);

// Create Workout
export const createWorkout = createAction(
    '[Workout] Create Workout',
    props<{ workout: Workout }>()
);
export const createWorkoutSuccess = createAction(
    '[Workout] Create Workout Success',
    props<{ workout: Workout }>()
);
export const createWorkoutFailure = createAction(
    '[Workout] Create Workout Failure',
    props<{ error: any }>()
);

// Update Workout
export const updateWorkout = createAction(
    '[Workout] Update Workout',
    props<{ id: string; workout: Partial<Workout> }>()
);
export const updateWorkoutSuccess = createAction(
    '[Workout] Update Workout Success',
    props<{ workout: Workout }>()
);
export const updateWorkoutFailure = createAction(
    '[Workout] Update Workout Failure',
    props<{ error: any }>()
);

// Delete Workout
export const deleteWorkout = createAction(
    '[Workout] Delete Workout',
    props<{ id: string }>()
);
export const deleteWorkoutSuccess = createAction(
    '[Workout] Delete Workout Success',
    props<{ id: string }>()
);
export const deleteWorkoutFailure = createAction(
    '[Workout] Delete Workout Failure',
    props<{ error: any }>()
);
