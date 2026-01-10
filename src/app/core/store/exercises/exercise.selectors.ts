import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExerciseState } from './exercise.reducer';

export const selectExerciseState = createFeatureSelector<ExerciseState>('exercises');

export const selectExercises = createSelector(
    selectExerciseState,
    (state: ExerciseState) => state.exercises
);

export const selectSelectedExercise = createSelector(
    selectExerciseState,
    (state: ExerciseState) => state.selectedExercise
);

export const selectExerciseFilters = createSelector(
    selectExerciseState,
    (state: ExerciseState) => state.filters
);

export const selectExercisePagination = createSelector(
    selectExerciseState,
    (state: ExerciseState) => state.pagination
);

export const selectExerciseLoading = createSelector(
    selectExerciseState,
    (state: ExerciseState) => state.loading
);

export const selectExerciseError = createSelector(
    selectExerciseState,
    (state: ExerciseState) => state.error
);

export const selectActiveExercises = createSelector(
    selectExercises,
    (exercises) => exercises.filter(ex => ex.isActive)
);

export const selectInactiveExercises = createSelector(
    selectExercises,
    (exercises) => exercises.filter(ex => !ex.isActive)
);
