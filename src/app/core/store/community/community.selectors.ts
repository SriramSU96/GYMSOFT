
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommunityState } from './community.reducer';

export const selectCommunityState = createFeatureSelector<CommunityState>('community');
export const selectPosts = createSelector(selectCommunityState, (state) => state.posts);
export const selectChallenges = createSelector(selectCommunityState, (state) => state.challenges);
