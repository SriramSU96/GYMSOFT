import { createReducer, on } from '@ngrx/store';
import { Workout } from '../../models/gym-extensions.model';
import * as WorkoutActions from './workout.actions';

export interface WorkoutState {
  workouts: Workout[];
  selectedWorkout: Workout | null;
  loading: boolean;
  error: any;
}

export const initialState: WorkoutState = {
  workouts: [],
  selectedWorkout: null,
  loading: false,
  error: null
};

export const workoutReducer = createReducer(
  initialState,

  // Load Workouts
  on(WorkoutActions.loadWorkouts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(WorkoutActions.loadWorkoutsSuccess, (state, { workouts }) => ({
    ...state,
    workouts,
    loading: false
  })),
  on(WorkoutActions.loadWorkoutsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load Single Workout
  on(WorkoutActions.loadWorkout, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(WorkoutActions.loadWorkoutSuccess, (state, { workout }) => ({
    ...state,
    selectedWorkout: workout,
    loading: false
  })),
  on(WorkoutActions.loadWorkoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create Workout
  on(WorkoutActions.createWorkout, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(WorkoutActions.createWorkoutSuccess, (state, { workout }) => ({
    ...state,
    workouts: [...state.workouts, workout],
    loading: false
  })),
  on(WorkoutActions.createWorkoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Workout
  on(WorkoutActions.updateWorkout, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(WorkoutActions.updateWorkoutSuccess, (state, { workout }) => ({
    ...state,
    workouts: state.workouts.map(w => w._id === workout._id ? workout : w),
    selectedWorkout: state.selectedWorkout?._id === workout._id ? workout : state.selectedWorkout,
    loading: false
  })),
  on(WorkoutActions.updateWorkoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete Workout
  on(WorkoutActions.deleteWorkout, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(WorkoutActions.deleteWorkoutSuccess, (state, { id }) => ({
    ...state,
    workouts: state.workouts.filter(w => w._id !== id),
    selectedWorkout: state.selectedWorkout?._id === id ? null : state.selectedWorkout,
    loading: false
  })),
  on(WorkoutActions.deleteWorkoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
