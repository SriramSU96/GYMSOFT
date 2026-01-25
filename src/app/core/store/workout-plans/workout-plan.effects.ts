import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { WorkoutPlanService } from '../../services/workout-plan.service';
import * as WorkoutPlanActions from './workout-plan.actions';

@Injectable()
export class WorkoutPlanEffects {
    private actions$ = inject(Actions);
    private workoutPlanService = inject(WorkoutPlanService);

    loadPlans$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutPlanActions.loadWorkoutPlans),
            switchMap((action) =>
                this.workoutPlanService.getPlans(action.params).pipe(
                    map((response) => WorkoutPlanActions.loadWorkoutPlansSuccess({ response })),
                    catchError((error) => of(WorkoutPlanActions.loadWorkoutPlansFailure({ error })))
                )
            )
        )
    );

    loadPlan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutPlanActions.loadWorkoutPlan),
            mergeMap((action) =>
                this.workoutPlanService.getPlanById(action.id).pipe(
                    map((response) => WorkoutPlanActions.loadWorkoutPlanSuccess({ plan: response })),
                    catchError((error) => of(WorkoutPlanActions.loadWorkoutPlanFailure({ error })))
                )
            )
        )
    );

    createPlan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutPlanActions.createWorkoutPlan),
            mergeMap((action) =>
                this.workoutPlanService.createPlan(action.plan).pipe(
                    map((response) => WorkoutPlanActions.createWorkoutPlanSuccess({ plan: response.workoutPlan })),
                    catchError((error) => of(WorkoutPlanActions.createWorkoutPlanFailure({ error })))
                )
            )
        )
    );

    deletePlan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutPlanActions.deleteWorkoutPlan),
            mergeMap((action) =>
                this.workoutPlanService.deletePlan(action.id).pipe(
                    map(() => WorkoutPlanActions.deleteWorkoutPlanSuccess({ id: action.id })),
                    catchError((error) => of(WorkoutPlanActions.deleteWorkoutPlanFailure({ error })))
                )
            )
        )
    );

    addDays$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutPlanActions.addWorkoutDays),
            mergeMap((action) =>
                this.workoutPlanService.addDays(action.planId, action.daysStructure).pipe(
                    map((response) => WorkoutPlanActions.addWorkoutDaysSuccess({ days: response.days })),
                    catchError((error) => of(WorkoutPlanActions.addWorkoutDaysFailure({ error })))
                )
            )
        )
    );

    addExercises$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutPlanActions.addExercisesToDay),
            mergeMap((action) =>
                this.workoutPlanService.addExercises(action.dayId, action.dto.exercises).pipe(
                    map((response) => WorkoutPlanActions.addExercisesToDaySuccess({ exercises: response.exercises })),
                    catchError((error) => of(WorkoutPlanActions.addExercisesToDayFailure({ error })))
                )
            )
        )
    );

    assignPlan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutPlanActions.assignWorkoutPlan),
            mergeMap((action) =>
                this.workoutPlanService.assignPlan(action.assignment).pipe(
                    map((response) => WorkoutPlanActions.assignWorkoutPlanSuccess({ assignment: response.assignment })),
                    catchError((error) => of(WorkoutPlanActions.assignWorkoutPlanFailure({ error })))
                )
            )
        )
    );
}
