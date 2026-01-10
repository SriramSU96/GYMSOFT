import { createReducer, on } from '@ngrx/store';
import { Exercise, ExerciseFilters } from '../../models/exercise.model';
import * as ExerciseActions from './exercise.actions';

export interface ExerciseState {
    exercises: Exercise[];
    selectedExercise: Exercise | null;
    filters: ExerciseFilters;
    pagination: {
        page: number;
        pages: number;
        total: number;
    };
    loading: boolean;
    error: any;
}

export const initialState: ExerciseState = {
    exercises: [],
    selectedExercise: null,
    filters: {},
    pagination: {
        page: 1,
        pages: 1,
        total: 0
    },
    loading: false,
    error: null
};

export const exerciseReducer = createReducer(
    initialState,

    // Load Exercises
    on(ExerciseActions.loadExercises, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(ExerciseActions.loadExercisesSuccess, (state, { exercises, page, pages, total }) => ({
        ...state,
        exercises,
        pagination: { page, pages, total },
        loading: false,
        error: null
    })),
    on(ExerciseActions.loadExercisesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Load Single Exercise
    on(ExerciseActions.loadExercise, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(ExerciseActions.loadExerciseSuccess, (state, { exercise }) => ({
        ...state,
        selectedExercise: exercise,
        loading: false,
        error: null
    })),
    on(ExerciseActions.loadExerciseFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Create Exercise
    on(ExerciseActions.createExercise, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(ExerciseActions.createExerciseSuccess, (state, { exercise }) => ({
        ...state,
        exercises: [...state.exercises, exercise],
        loading: false,
        error: null
    })),
    on(ExerciseActions.createExerciseFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Update Exercise
    on(ExerciseActions.updateExercise, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(ExerciseActions.updateExerciseSuccess, (state, { exercise }) => ({
        ...state,
        exercises: state.exercises.map(ex => ex._id === exercise._id ? exercise : ex),
        selectedExercise: state.selectedExercise?._id === exercise._id ? exercise : state.selectedExercise,
        loading: false,
        error: null
    })),
    on(ExerciseActions.updateExerciseFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Activate Exercise
    on(ExerciseActions.activateExercise, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(ExerciseActions.activateExerciseSuccess, (state, { exercise }) => ({
        ...state,
        exercises: state.exercises.map(ex => ex._id === exercise._id ? exercise : ex),
        selectedExercise: state.selectedExercise?._id === exercise._id ? exercise : state.selectedExercise,
        loading: false,
        error: null
    })),
    on(ExerciseActions.activateExerciseFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Deactivate Exercise
    on(ExerciseActions.deactivateExercise, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(ExerciseActions.deactivateExerciseSuccess, (state, { exercise }) => ({
        ...state,
        exercises: state.exercises.map(ex => ex._id === exercise._id ? exercise : ex),
        selectedExercise: state.selectedExercise?._id === exercise._id ? exercise : state.selectedExercise,
        loading: false,
        error: null
    })),
    on(ExerciseActions.deactivateExerciseFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Delete Exercise
    on(ExerciseActions.deleteExercise, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(ExerciseActions.deleteExerciseSuccess, (state, { id }) => ({
        ...state,
        exercises: state.exercises.filter(ex => ex._id !== id),
        selectedExercise: state.selectedExercise?._id === id ? null : state.selectedExercise,
        loading: false,
        error: null
    })),
    on(ExerciseActions.deleteExerciseFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Set Filters
    on(ExerciseActions.setExerciseFilters, (state, { filters }) => ({
        ...state,
        filters
    })),

    // Clear Selected Exercise
    on(ExerciseActions.clearSelectedExercise, (state) => ({
        ...state,
        selectedExercise: null
    }))
);
