import { createReducer, on } from '@ngrx/store';
import { Gym, GymBranch } from '../../models/gym.model';
import * as GymActions from './gym.actions';

export interface GymState {
    currentGym: Gym | null;
    branches: GymBranch[];
    loading: boolean;
    error: any;
}

export const initialState: GymState = {
    currentGym: null,
    branches: [],
    loading: false,
    error: null
};

export const gymReducer = createReducer(
    initialState,

    // Gym Loading / Updating
    on(GymActions.loadCurrentGym, GymActions.updateGym, GymActions.updateSettings, (state) => ({
        ...state, loading: true, error: null
    })),
    on(GymActions.loadCurrentGymSuccess, GymActions.updateGymSuccess, GymActions.updateSettingsSuccess, (state, { gym }) => ({
        ...state, currentGym: gym, loading: false
    })),
    on(GymActions.loadCurrentGymFailure, GymActions.updateGymFailure, GymActions.updateSettingsFailure, (state, { error }) => ({
        ...state, loading: false, error
    })),

    // Branches
    on(GymActions.loadBranches, (state) => ({
        ...state, loading: true, error: null
    })),
    on(GymActions.loadBranchesSuccess, (state, { branches }) => ({
        ...state, branches, loading: false
    })),
    on(GymActions.loadBranchesFailure, (state, { error }) => ({
        ...state, loading: false, error
    })),

    on(GymActions.createBranchSuccess, (state, { branch }) => ({
        ...state, branches: [...state.branches, branch], loading: false
    })),
    on(GymActions.updateBranchSuccess, (state, { branch }) => ({
        ...state,
        branches: state.branches.map(b => b.id === branch.id || b._id === branch._id ? branch : b),
        loading: false
    })),
    on(GymActions.deleteBranchSuccess, (state, { id }) => ({
        ...state,
        branches: state.branches.filter(b => b.id !== id && b._id !== id),
        loading: false
    }))
);
