import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as GymActions from './gym.actions';
import { GymService } from '../../services/gym.service';
import { ToastService } from '../../services/toast.service';

@Injectable()
export class GymEffects {
    private actions$ = inject(Actions);
    private gymService = inject(GymService);
    private toast = inject(ToastService);

    loadCurrentGym$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GymActions.loadCurrentGym),
            mergeMap(() =>
                this.gymService.getCurrentGym().pipe(
                    map(response => GymActions.loadCurrentGymSuccess({ gym: response.data })),
                    catchError(error => of(GymActions.loadCurrentGymFailure({ error })))
                )
            )
        )
    );

    updateGym$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GymActions.updateGym),
            mergeMap(action =>
                this.gymService.updateGym(action.data).pipe(
                    map(response => {
                        this.toast.success('Gym Profile Updated');
                        return GymActions.updateGymSuccess({ gym: response.data });
                    }),
                    catchError(error => {
                        this.toast.error('Update Failed');
                        return of(GymActions.updateGymFailure({ error }));
                    })
                )
            )
        )
    );

    updateSettings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GymActions.updateSettings),
            mergeMap(action =>
                this.gymService.updateSettings(action.config).pipe(
                    map(response => {
                        this.toast.success('Settings Updated');
                        return GymActions.updateSettingsSuccess({ gym: response.data });
                    }),
                    catchError(error => {
                        this.toast.error('Settings Update Failed');
                        return of(GymActions.updateSettingsFailure({ error }));
                    })
                )
            )
        )
    );

    loadBranches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GymActions.loadBranches),
            mergeMap(() =>
                this.gymService.getBranches().pipe(
                    map(response => GymActions.loadBranchesSuccess({ branches: response.data })),
                    catchError(error => of(GymActions.loadBranchesFailure({ error })))
                )
            )
        )
    );

    createBranch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GymActions.createBranch),
            mergeMap(action =>
                this.gymService.createBranch(action.branch).pipe(
                    map(response => {
                        this.toast.success('Branch Created');
                        return GymActions.createBranchSuccess({ branch: response.data });
                    }),
                    catchError(error => {
                        this.toast.error('Branch Creation Failed');
                        return of(GymActions.createBranchFailure({ error }));
                    })
                )
            )
        )
    );

    updateBranch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GymActions.updateBranch),
            mergeMap(action =>
                this.gymService.updateBranch(action.id, action.branch).pipe(
                    map(response => {
                        this.toast.success('Branch Updated');
                        return GymActions.updateBranchSuccess({ branch: response.data });
                    }),
                    catchError(error => {
                        this.toast.error('Branch Update Failed');
                        return of(GymActions.updateBranchFailure({ error }));
                    })
                )
            )
        )
    );

    deleteBranch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GymActions.deleteBranch),
            mergeMap(action =>
                this.gymService.deleteBranch(action.id).pipe(
                    map(() => {
                        this.toast.success('Branch Deleted');
                        return GymActions.deleteBranchSuccess({ id: action.id });
                    }),
                    catchError(error => {
                        this.toast.error('Branch Deletion Failed');
                        return of(GymActions.deleteBranchFailure({ error }));
                    })
                )
            )
        )
    );
}
