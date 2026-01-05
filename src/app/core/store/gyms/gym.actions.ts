import { createAction, props } from '@ngrx/store';
import { Gym, GymBranch } from '../../models/gym.model';

export const loadGyms = createAction('[Gym] Load Gyms');
export const loadGymsSuccess = createAction('[Gym] Load Gyms Success', props<{ gyms: Gym[] }>());
export const loadGymsFailure = createAction('[Gym] Load Gyms Failure', props<{ error: any }>());

export const loadBranches = createAction('[Gym] Load Branches', props<{ gymId: string }>());
export const loadBranchesSuccess = createAction('[Gym] Load Branches Success', props<{ branches: GymBranch[] }>());
export const loadBranchesFailure = createAction('[Gym] Load Branches Failure', props<{ error: any }>());

export const createBranch = createAction('[Gym] Create Branch', props<{ gymId: string, branchData: any }>());
export const createBranchSuccess = createAction('[Gym] Create Branch Success', props<{ branch: GymBranch }>());
export const createBranchFailure = createAction('[Gym] Create Branch Failure', props<{ error: any }>());

export const selectGym = createAction('[Gym] Select Gym', props<{ gym: Gym | GymBranch }>());
