import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MembersState, adapter } from './members.reducer';

export const selectMembersState = createFeatureSelector<MembersState>('members');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors(selectMembersState);

export const selectAllMembers = selectAll;

export const selectMembersLoading = createSelector(
    selectMembersState,
    (state) => state.isLoading
);

export const selectMembersError = createSelector(
    selectMembersState,
    (state) => state.error
);

export const selectMembersPagination = createSelector(
    selectMembersState,
    (state) => ({
        total: state.total,
        page: state.page,
        pages: state.pages
    })
);

export const selectSelectedMember = createSelector(
    selectMembersState,
    (state) => state.selectedMember
);

export const selectSelectedMemberProgress = createSelector(
    selectMembersState,
    (state) => state.selectedMemberProgress
);

export const selectSelectedMemberAchievements = createSelector(
    selectMembersState,
    (state) => state.selectedMemberAchievements
);
