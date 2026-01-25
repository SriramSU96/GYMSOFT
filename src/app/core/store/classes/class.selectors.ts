import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClassState, selectAll } from './class.reducer';

export const selectClassState = createFeatureSelector<ClassState>('classes');

export const selectAllClasses = createSelector(
    selectClassState,
    selectAll
);

export const selectClassesLoading = createSelector(
    selectClassState,
    (state) => state.loading
);

export const selectMemberBookings = createSelector(
    selectClassState,
    (state) => state.memberBookings
);

export const selectBookingsLoading = createSelector(
    selectClassState,
    (state) => state.bookingsLoading
);
