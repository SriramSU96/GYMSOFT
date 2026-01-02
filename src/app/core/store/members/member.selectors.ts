
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MemberState } from './member.reducer';

export const selectMemberState = createFeatureSelector<MemberState>('members');

export const selectCurrentMember = createSelector(
    selectMemberState,
    (state) => state.currentMember
);

export const selectMembers = createSelector(
    selectMemberState,
    (state) => state.members
);

export const selectProgressHistory = createSelector(
    selectMemberState,
    (state) => state.progressHistory
);

export const selectAchievements = createSelector(
    selectMemberState,
    (state) => state.achievements
);

export const selectMemberIsLoading = createSelector(
    selectMemberState,
    (state) => state.isLoading
);

export const selectMemberError = createSelector(
    selectMemberState,
    (state) => state.error
);
