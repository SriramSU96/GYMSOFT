import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { GymService } from '../../services/gym.service';
import * as GymActions from './gym.actions';

@Injectable()
export class GymEffects {
    private actions$ = inject(Actions);
    private gymService = inject(GymService);

    loadGyms$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GymActions.loadGyms),
            mergeMap(() =>
                this.gymService.getGyms().pipe(
                    map((gyms) => GymActions.loadGymsSuccess({ gyms })),
                    catchError((error) => of(GymActions.loadGymsFailure({ error })))
                )
            )
        )
    );

    loadBranches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GymActions.loadBranches),
            mergeMap(({ gymId }) =>
                this.gymService.getBranches(gymId).pipe(
                    map((branches) => GymActions.loadBranchesSuccess({ branches })),
                    catchError((error) => of(GymActions.loadBranchesFailure({ error })))
                )
            )
        )
    );

    createBranch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GymActions.createBranch),
            mergeMap(({ gymId, branchData }) =>
                this.gymService.createBranch(gymId, branchData).pipe(
                    map((branch) => GymActions.createBranchSuccess({ branch })),
                    catchError((error) => of(GymActions.createBranchFailure({ error })))
                )
            )
        )
    );
}
