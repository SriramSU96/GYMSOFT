
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ExerciseService } from '../../services/exercise.service';
import { ToastService } from '../../services/toast.service';
import * as ExerciseActions from './exercise.actions';

@Injectable()
export class ExerciseEffects {
    private actions$ = inject(Actions);
    private exerciseService = inject(ExerciseService);
    private toastService = inject(ToastService);
    private router = inject(Router);

    loadExercises$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExerciseActions.loadExercises),
            mergeMap(({ filters, pageSize, pageNumber }) =>
                this.exerciseService.getExercises(filters, pageSize, pageNumber).pipe(
                    map((response) => ExerciseActions.loadExercisesSuccess({
                        exercises: response.exercises,
                        page: response.page,
                        pages: response.pages,
                        total: response.total
                    })),
                    catchError((error) => {
                        this.toastService.error('Failed to load exercises');
                        return of(ExerciseActions.loadExercisesFailure({ error }));
                    })
                )
            )
        )
    );

    loadExercise$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExerciseActions.loadExercise),
            mergeMap(({ id }) =>
                this.exerciseService.getExerciseById(id).pipe(
                    map((response) => ExerciseActions.loadExerciseSuccess({ exercise: response.exercise })),
                    catchError((error) => {
                        this.toastService.error('Failed to load exercise');
                        return of(ExerciseActions.loadExerciseFailure({ error }));
                    })
                )
            )
        )
    );

    createExercise$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExerciseActions.createExercise),
            mergeMap(({ exercise }) =>
                this.exerciseService.createExercise(exercise as any).pipe(
                    map((newExercise) => {
                        this.toastService.success('Exercise created successfully');
                        return ExerciseActions.createExerciseSuccess({ exercise: newExercise });
                    }),
                    catchError((error) => {
                        this.toastService.error('Failed to create exercise');
                        return of(ExerciseActions.createExerciseFailure({ error }));
                    })
                )
            )
        )
    );

    createExerciseSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExerciseActions.createExerciseSuccess),
            tap(() => {
                this.router.navigate(['/workouts/exercises']);
            })
        ),
        { dispatch: false }
    );

    updateExercise$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExerciseActions.updateExercise),
            mergeMap(({ id, changes }) =>
                this.exerciseService.updateExercise(id, changes as any).pipe(
                    map((exercise) => {
                        this.toastService.success('Exercise updated successfully');
                        return ExerciseActions.updateExerciseSuccess({ exercise });
                    }),
                    catchError((error) => {
                        this.toastService.error('Failed to update exercise');
                        return of(ExerciseActions.updateExerciseFailure({ error }));
                    })
                )
            )
        )
    );

    updateExerciseSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExerciseActions.updateExerciseSuccess),
            tap(() => {
                this.router.navigate(['/workouts/exercises']);
            })
        ),
        { dispatch: false }
    );

    activateExercise$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExerciseActions.activateExercise),
            mergeMap(({ id }) =>
                this.exerciseService.activateExercise(id).pipe(
                    map((response) => {
                        this.toastService.success('Exercise activated successfully');
                        return ExerciseActions.activateExerciseSuccess({ exercise: response.exercise });
                    }),
                    catchError((error) => {
                        this.toastService.error('Failed to activate exercise');
                        return of(ExerciseActions.activateExerciseFailure({ error }));
                    })
                )
            )
        )
    );

    deactivateExercise$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExerciseActions.deactivateExercise),
            mergeMap(({ id }) =>
                this.exerciseService.deactivateExercise(id).pipe(
                    map((response) => {
                        this.toastService.success('Exercise deactivated successfully');
                        return ExerciseActions.deactivateExerciseSuccess({ exercise: response.exercise });
                    }),
                    catchError((error) => {
                        this.toastService.error('Failed to deactivate exercise');
                        return of(ExerciseActions.deactivateExerciseFailure({ error }));
                    })
                )
            )
        )
    );

    deleteExercise$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ExerciseActions.deleteExercise),
            mergeMap(({ id }) =>
                this.exerciseService.deleteExercise(id).pipe(
                    map(() => {
                        this.toastService.success('Exercise deleted permanently');
                        return ExerciseActions.deleteExerciseSuccess({ id });
                    }),
                    catchError((error) => {
                        this.toastService.error('Failed to delete exercise');
                        return of(ExerciseActions.deleteExerciseFailure({ error }));
                    })
                )
            )
        )
    );
}
