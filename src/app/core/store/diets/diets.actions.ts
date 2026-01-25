import { createAction, props } from '@ngrx/store';
import { DietPlan, DietPlansResponse, DietDay, DietMealSlot, DietMealItem, AssignedDietPlan } from '../../models/diet.model';

// Load Plans
export const loadDietPlans = createAction('[Diet Plans] Load Plans', props<{ params: any }>());
export const loadDietPlansSuccess = createAction('[Diet Plans] Load Plans Success', props<{ response: DietPlansResponse }>());
export const loadDietPlansFailure = createAction('[Diet Plans] Load Plans Failure', props<{ error: any }>());

// Load Single Plan
export const loadDietPlan = createAction('[Diet Plans] Load Plan', props<{ id: string }>());
export const loadDietPlanSuccess = createAction('[Diet Plans] Load Plan Success', props<{ plan: any }>());
export const loadDietPlanFailure = createAction('[Diet Plans] Load Plan Failure', props<{ error: any }>());

// Create Plan
export const createDietPlan = createAction('[Diet Plans] Create Plan', props<{ plan: Partial<DietPlan> }>());
export const createDietPlanSuccess = createAction('[Diet Plans] Create Plan Success', props<{ plan: DietPlan }>());
export const createDietPlanFailure = createAction('[Diet Plans] Create Plan Failure', props<{ error: any }>());

// Update Plan
export const updateDietPlan = createAction('[Diet Plans] Update Plan', props<{ id: string, plan: Partial<DietPlan> }>());
export const updateDietPlanSuccess = createAction('[Diet Plans] Update Plan Success', props<{ plan: DietPlan }>());
export const updateDietPlanFailure = createAction('[Diet Plans] Update Plan Failure', props<{ error: any }>());

// Deactivate Plan
export const deactivateDietPlan = createAction('[Diet Plans] Deactivate Plan', props<{ id: string }>());
export const deactivateDietPlanSuccess = createAction('[Diet Plans] Deactivate Plan Success', props<{ id: string }>());
export const deactivateDietPlanFailure = createAction('[Diet Plans] Deactivate Plan Failure', props<{ error: any }>());

// Days & Meals
export const addDietDay = createAction('[Diet Plans] Add Day', props<{ planId: string, day: { dayNumber: number; title: string } }>());
export const addDietDaySuccess = createAction('[Diet Plans] Add Day Success', props<{ day: DietDay }>());
export const addDietDayFailure = createAction('[Diet Plans] Add Day Failure', props<{ error: any }>());

// Assignment
export const assignDietPlan = createAction('[Diet Plans] Assign Plan', props<{ assignment: { memberId: string; dietPlanId: string; startDate: Date; endDate?: Date } }>());
export const assignDietPlanSuccess = createAction('[Diet Plans] Assign Plan Success', props<{ assignment: AssignedDietPlan }>());
export const assignDietPlanFailure = createAction('[Diet Plans] Assign Plan Failure', props<{ error: any }>());
