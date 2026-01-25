import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { DietService } from '../../services/diet.service';
import * as DietActions from './diets.actions';

@Injectable()
export class DietEffects {
    private actions$ = inject(Actions);
    private dietService = inject(DietService);

    loadPlans$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DietActions.loadDietPlans),
            switchMap((action) =>
                this.dietService.getPlans(action.params).pipe(
                    map((response) => DietActions.loadDietPlansSuccess({ response })),
                    catchError((error) => of(DietActions.loadDietPlansFailure({ error })))
                )
            )
        )
    );

    loadPlan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DietActions.loadDietPlan),
            mergeMap((action) =>
                this.dietService.getPlanById(action.id).pipe(
                    map((response) => DietActions.loadDietPlanSuccess({ plan: response })),
                    catchError((error) => of(DietActions.loadDietPlanFailure({ error })))
                )
            )
        )
    );

    createPlan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DietActions.createDietPlan),
            mergeMap((action) =>
                this.dietService.createPlan(action.plan).pipe(
                    map((response) => DietActions.createDietPlanSuccess({ plan: response.dietPlan })),
                    catchError((error) => of(DietActions.createDietPlanFailure({ error })))
                )
            )
        )
    );

    updatePlan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DietActions.updateDietPlan),
            mergeMap((action) =>
                this.dietService.updatePlan(action.id, action.plan).pipe(
                    map((response) => DietActions.updateDietPlanSuccess({ plan: response.dietPlan })),
                    catchError((error) => of(DietActions.updateDietPlanFailure({ error })))
                )
            )
        )
    );

    deactivatePlan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DietActions.deactivateDietPlan),
            mergeMap((action) =>
                this.dietService.deactivatePlan(action.id).pipe(
                    map(() => DietActions.deactivateDietPlanSuccess({ id: action.id })),
                    catchError((error) => of(DietActions.deactivateDietPlanFailure({ error })))
                )
            )
        )
    );

    addDay$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DietActions.addDietDay),
            mergeMap((action) =>
                this.dietService.addDays(action.planId, action.day).pipe(
                    map((response) => DietActions.addDietDaySuccess({ day: response.day })),
                    catchError((error) => of(DietActions.addDietDayFailure({ error })))
                )
            )
        )
    );

    assignPlan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DietActions.assignDietPlan),
            mergeMap((action) =>
                this.dietService.assignPlan(action.assignment).pipe(
                    map((response) => DietActions.assignDietPlanSuccess({ assignment: response.assignment })),
                    catchError((error) => of(DietActions.assignDietPlanFailure({ error })))
                )
            )
        )
    );
}
