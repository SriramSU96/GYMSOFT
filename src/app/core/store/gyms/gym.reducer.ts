import { createReducer, on } from '@ngrx/store';
import * as GymActions from './gym.actions';
import { Gym, GymBranch } from '../../models/gym.model';

export interface GymState {
    gyms: Gym[];
    branches: GymBranch[];
    selectedGym: Gym | GymBranch | null;
    isLoading: boolean;
    error: any;
}

export const initialState: GymState = {
    gyms: [],
    branches: [],
    selectedGym: null,
    isLoading: false,
    error: null
};

export const gymReducer = createReducer(
    initialState,
    on(GymActions.loadGyms, (state) => ({ ...state, isLoading: true })),
    on(GymActions.loadGymsSuccess, (state, { gyms }) => ({
        ...state,
        gyms,
        isLoading: false,
        selectedGym: state.selectedGym || gyms[0] || null
    })),
    on(GymActions.loadGymsFailure, (state, { error }) => ({ ...state, error, isLoading: false })),

    on(GymActions.loadBranches, (state) => ({ ...state, isLoading: true })),
    on(GymActions.loadBranchesSuccess, (state, { branches }) => ({ ...state, branches, isLoading: false })),
    on(GymActions.loadBranchesFailure, (state, { error }) => ({ ...state, error, isLoading: false })),

    on(GymActions.createBranch, (state) => ({ ...state, isLoading: true })),
    on(GymActions.createBranchSuccess, (state, { branch }) => ({
        ...state,
        branches: [...state.branches, branch],
        isLoading: false
    })),
    on(GymActions.createBranchFailure, (state, { error }) => ({ ...state, error, isLoading: false })),

    on(GymActions.selectGym, (state, { gym }) => ({ ...state, selectedGym: gym }))
);
