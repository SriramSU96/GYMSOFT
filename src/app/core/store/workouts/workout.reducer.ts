import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ExerciseActions from './workout.actions';
import { Exercise } from '../../models/exercise.model';

export interface ExercisesState extends EntityState<Exercise> {
  isLoading: boolean;
  error: any;
}

export const adapter: EntityAdapter<Exercise> = createEntityAdapter<Exercise>({
  selectId: (exercise: Exercise) => exercise._id,
  sortComparer: false
});

export const initialState: ExercisesState = adapter.getInitialState({
  isLoading: false,
  error: null
});

export const exerciseReducer = createReducer(
  initialState,

  // Load
  on(ExerciseActions.loadExercises, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(ExerciseActions.loadExercisesSuccess, (state, { response }) => {
    return adapter.setAll(response.data, {
      ...state,
      isLoading: false
    });
  }),
  on(ExerciseActions.loadExercisesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // CRUD
  on(ExerciseActions.createExerciseSuccess, (state, { exercise }) => adapter.addOne(exercise, state)),
  on(ExerciseActions.updateExerciseSuccess, (state, { exercise }) => adapter.updateOne({ id: exercise._id, changes: exercise }, state)),
  on(ExerciseActions.deleteExerciseSuccess, (state, { id }) => adapter.removeOne(id, state))
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
