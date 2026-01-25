import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as DietActions from './diets.actions';
import { DietPlan } from '../../models/diet.model';

export interface DietsState extends EntityAdapter<DietPlan> {
    selectedPlan: any | null;
    isLoading: boolean;
    error: any;
}

export const adapter: EntityAdapter<DietPlan> = createEntityAdapter<DietPlan>({
    selectId: (plan: DietPlan) => plan._id,
    sortComparer: false
});

export const initialState: DietsState = adapter.getInitialState({
    selectedPlan: null,
    isLoading: false,
    error: null
});

export const dietsReducer = createReducer(
    initialState,

    // Load Plans
    on(DietActions.loadDietPlans, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(DietActions.loadDietPlansSuccess, (state, { response }) => {
        return adapter.setAll(response.dietPlans, {
            ...state,
            isLoading: false
        });
    }),
    on(DietActions.loadDietPlansFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),

    // Load Single Plan
    on(DietActions.loadDietPlan, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(DietActions.loadDietPlanSuccess, (state, { plan }) => ({
        ...state,
        selectedPlan: plan,
        isLoading: false
    })),

    // Create
    on(DietActions.createDietPlanSuccess, (state, { plan }) => adapter.addOne(plan, state)),

    // Update
    on(DietActions.updateDietPlanSuccess, (state, { plan }) => adapter.updateOne({ id: plan._id, changes: plan }, state)),

    // Deactivate (Update isActive)
    on(DietActions.deactivateDietPlanSuccess, (state, { id }) => adapter.updateOne({ id, changes: { isActive: false } }, state))
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
