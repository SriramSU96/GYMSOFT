import { createAction, props } from '@ngrx/store';
import { Gym, GymBranch, GymConfig } from '../../models/gym.model';

// Gym
export const loadCurrentGym = createAction('[Gym] Load Current Gym');
export const loadCurrentGymSuccess = createAction(
    '[Gym] Load Current Gym Success',
    props<{ gym: Gym }>()
);
export const loadCurrentGymFailure = createAction(
    '[Gym] Load Current Gym Failure',
    props<{ error: any }>()
);

export const updateGym = createAction(
    '[Gym] Update Gym',
    props<{ data: Partial<Gym> }>()
);
export const updateGymSuccess = createAction(
    '[Gym] Update Gym Success',
    props<{ gym: Gym }>()
);
export const updateGymFailure = createAction(
    '[Gym] Update Gym Failure',
    props<{ error: any }>()
);

export const updateSettings = createAction(
    '[Gym] Update Settings',
    props<{ config: Partial<GymConfig> }>()
);
export const updateSettingsSuccess = createAction(
    '[Gym] Update Settings Success',
    props<{ gym: Gym }>()
);
export const updateSettingsFailure = createAction(
    '[Gym] Update Settings Failure',
    props<{ error: any }>()
);

// Branches
export const loadBranches = createAction('[Gym] Load Branches');
export const loadBranchesSuccess = createAction(
    '[Gym] Load Branches Success',
    props<{ branches: GymBranch[] }>()
);
export const loadBranchesFailure = createAction(
    '[Gym] Load Branches Failure',
    props<{ error: any }>()
);

export const createBranch = createAction(
    '[Gym] Create Branch',
    props<{ branch: Partial<GymBranch> }>()
);
export const createBranchSuccess = createAction(
    '[Gym] Create Branch Success',
    props<{ branch: GymBranch }>()
);
export const createBranchFailure = createAction(
    '[Gym] Create Branch Failure',
    props<{ error: any }>()
);

export const updateBranch = createAction(
    '[Gym] Update Branch',
    props<{ id: string; branch: Partial<GymBranch> }>()
);
export const updateBranchSuccess = createAction(
    '[Gym] Update Branch Success',
    props<{ branch: GymBranch }>()
);
export const updateBranchFailure = createAction(
    '[Gym] Update Branch Failure',
    props<{ error: any }>()
);

export const deleteBranch = createAction(
    '[Gym] Delete Branch',
    props<{ id: string }>()
);
export const deleteBranchSuccess = createAction(
    '[Gym] Delete Branch Success',
    props<{ id: string }>()
);
export const deleteBranchFailure = createAction(
    '[Gym] Delete Branch Failure',
    props<{ error: any }>()
);
