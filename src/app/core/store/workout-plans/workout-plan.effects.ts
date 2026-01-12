import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';
import { WorkoutPlanService } from '../../services/workout-plan.service';
import { ToastService } from '../../services/toast.service';
import * as WorkoutPlanActions from './workout-plan.actions';

@Injectable()
export class WorkoutPlanEffects {
    private actions$ = inject(Actions);
    private workoutPlanService = inject(WorkoutPlanService);
    private toastService = inject(ToastService);
    private router = inject(Router);

    // ========================================
    // Load Plans
    // ========================================
    loadPlans$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutPlanActions.loadPlans),
            tap(({ filters, pageNumber, pageSize }) => {
                console.log('🔵 EFFECT: loadPlans triggered');
                console.log('Filters:', filters);
                console.log('Page:', pageNumber, 'Size:', pageSize);
            }),
            mergeMap(({ filters, pageNumber, pageSize }) =>
                this.workoutPlanService.getPlans(filters, pageNumber, pageSize).pipe(
                    tap((response) => {
                        console.log('✅ API SUCCESS: loadPlans');
                        console.log('🔍 FULL RESPONSE:', response);
                        console.log('Response type:', typeof response);
                        console.log('Response keys:', Object.keys(response));
                        console.log('Plans received:', response.plans);
                        console.log('Total plans:', response.total);
                        console.log('Pages:', response.pages);
                    }),
                    map((response) => WorkoutPlanActions.loadPlansSuccess({ response })),
                    catchError((error) => {
                        console.error('❌ API ERROR: loadPlans');
                        console.error('Error:', error);
                        return of(WorkoutPlanActions.loadPlansFailure({ error }));
                    })
                )
            )
        )
    );

    // ========================================
    // Load Plan Structure
    // ========================================
    loadPlanStructure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutPlanActions.loadPlanStructure),
            mergeMap(({ planId }) =>
                this.workoutPlanService.getPlanStructure(planId).pipe(
                    map((plan) => WorkoutPlanActions.loadPlanStructureSuccess({ plan })),
                    catchError((error) => of(WorkoutPlanActions.loadPlanStructureFailure({ error })))
                )
            )
        )
    );

    // ========================================
    // Create Plan
    // ========================================
    createPlan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutPlanActions.createPlan),
            mergeMap(({ dto }) =>
                this.workoutPlanService.createPlan(dto).pipe(
                    map((plan) => WorkoutPlanActions.createPlanSuccess({ plan })),
                    catchError((error) => of(WorkoutPlanActions.createPlanFailure({ error })))
                )
            )
        )
    );

    createPlanSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(WorkoutPlanActions.createPlanSuccess),
                tap(() => {
                    this.toastService.success('Plan created successfully! Now add workout days.');
                })
            ),
        { dispatch: false }
    );

    // ========================================
    // Add Days
    // ========================================
    addDaysToPlan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutPlanActions.addDaysToPlan),
            mergeMap(({ planId, dto }) =>
                this.workoutPlanService.addDaysToPlan(planId, dto).pipe(
                    map((days) => WorkoutPlanActions.addDaysToPlanSuccess({ days })),
                    catchError((error) => of(WorkoutPlanActions.addDaysToPlanFailure({ error })))
                )
            )
        )
    );

    addDaysToPlanSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(WorkoutPlanActions.addDaysToPlanSuccess),
                tap(() => {
                    this.toastService.success('Days added successfully! Now add exercises.');
                })
            ),
        { dispatch: false }
    );

    // ========================================
    // Add Exercises
    // ========================================
    addExercisesToDay$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutPlanActions.addExercisesToDay),
            tap(({ dayId, dto }) => {
                console.log('🔵 EFFECT: addExercisesToDay triggered');
                console.log('Day ID:', dayId);
                console.log('DTO:', dto);
            }),
            mergeMap(({ dayId, dto }) =>
                this.workoutPlanService.addExercisesToDay(dayId, dto).pipe(
                    tap((exercises) => {
                        console.log('✅ API SUCCESS: addExercisesToDay');
                        console.log('Response exercises:', exercises);
                    }),
                    map((exercises) => WorkoutPlanActions.addExercisesToDaySuccess({ dayId, exercises })),
                    catchError((error) => {
                        console.error('❌ API ERROR: addExercisesToDay');
                        console.error('Error:', error);
                        console.error('Error status:', error?.status);
                        console.error('Error message:', error?.error?.message || error?.message);
                        return of(WorkoutPlanActions.addExercisesToDayFailure({ error }));
                    })
                )
            )
        )
    );

    addExercisesToDaySuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(WorkoutPlanActions.addExercisesToDaySuccess),
                tap(({ dayId, exercises }) => {
                    console.log('🎉 SUCCESS ACTION: addExercisesToDaySuccess');
                    console.log('Day ID:', dayId);
                    console.log('Exercises added:', exercises);
                    console.log('Showing toast notification...');
                    this.toastService.success('Exercises added successfully!');
                })
            ),
        { dispatch: false }
    );

    // ========================================
    // Update Plan
    // ========================================
    updatePlan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutPlanActions.updatePlan),
            mergeMap(({ planId, dto }) =>
                this.workoutPlanService.updatePlan(planId, dto).pipe(
                    map((plan) => WorkoutPlanActions.updatePlanSuccess({ plan })),
                    catchError((error) => of(WorkoutPlanActions.updatePlanFailure({ error })))
                )
            )
        )
    );

    updatePlanSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(WorkoutPlanActions.updatePlanSuccess),
                tap(() => {
                    this.toastService.success('Plan updated successfully!');
                    this.router.navigate(['/workouts/plans']);
                })
            ),
        { dispatch: false }
    );

    // ========================================
    // Delete Plan
    // ========================================
    deletePlan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutPlanActions.deletePlan),
            mergeMap(({ planId }) =>
                this.workoutPlanService.deletePlan(planId).pipe(
                    map(() => WorkoutPlanActions.deletePlanSuccess({ planId })),
                    catchError((error) => of(WorkoutPlanActions.deletePlanFailure({ error })))
                )
            )
        )
    );

    deletePlanSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(WorkoutPlanActions.deletePlanSuccess),
                tap(() => {
                    this.toastService.success('Plan deleted successfully!');
                })
            ),
        { dispatch: false }
    );

    // ========================================
    // Assign Plan
    // ========================================
    assignPlan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutPlanActions.assignPlan),
            mergeMap(({ dto }) =>
                this.workoutPlanService.assignPlanToMember(dto).pipe(
                    map((assignment) => WorkoutPlanActions.assignPlanSuccess({ assignment })),
                    catchError((error) => of(WorkoutPlanActions.assignPlanFailure({ error })))
                )
            )
        )
    );

    assignPlanSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(WorkoutPlanActions.assignPlanSuccess),
                tap(() => {
                    this.toastService.success('Plan assigned to member successfully!');
                })
            ),
        { dispatch: false }
    );

    // ========================================
    // Load Member Workout
    // ========================================
    loadMemberWorkout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutPlanActions.loadMemberWorkout),
            mergeMap(({ memberId }) =>
                this.workoutPlanService.getMemberWorkout(memberId).pipe(
                    map((response) => WorkoutPlanActions.loadMemberWorkoutSuccess({ response })),
                    catchError((error) => of(WorkoutPlanActions.loadMemberWorkoutFailure({ error })))
                )
            )
        )
    );

    // ========================================
    // Track Completion
    // ========================================
    trackCompletion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkoutPlanActions.trackCompletion),
            mergeMap(({ dto }) =>
                this.workoutPlanService.trackCompletion(dto).pipe(
                    map((completion) => WorkoutPlanActions.trackCompletionSuccess({ completion })),
                    catchError((error) => of(WorkoutPlanActions.trackCompletionFailure({ error })))
                )
            )
        )
    );

    trackCompletionSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(WorkoutPlanActions.trackCompletionSuccess),
                tap(({ completion }) => {
                    const message = completion.completed ? 'Exercise marked as complete!' : 'Exercise unmarked.';
                    this.toastService.success(message);
                })
            ),
        { dispatch: false }
    );

    // ========================================
    // Error Handling
    // ========================================
    handleError$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    WorkoutPlanActions.loadPlansFailure,
                    WorkoutPlanActions.loadPlanStructureFailure,
                    WorkoutPlanActions.createPlanFailure,
                    WorkoutPlanActions.addDaysToPlanFailure,
                    WorkoutPlanActions.addExercisesToDayFailure,
                    WorkoutPlanActions.updatePlanFailure,
                    WorkoutPlanActions.deletePlanFailure,
                    WorkoutPlanActions.assignPlanFailure,
                    WorkoutPlanActions.loadMemberWorkoutFailure,
                    WorkoutPlanActions.trackCompletionFailure
                ),
                tap(({ error }) => {
                    const message = error?.error?.message || error?.message || 'An error occurred';
                    this.toastService.error(message);
                })
            ),
        { dispatch: false }
    );
}
