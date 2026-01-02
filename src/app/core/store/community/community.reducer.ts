
import { createReducer, on } from '@ngrx/store';
import * as CommunityActions from './community.actions';
import { Post, Challenge } from '../../models/community.model';

export interface CommunityState {
    posts: Post[];
    challenges: Challenge[];
    isLoading: boolean;
    error: any;
}

export const initialState: CommunityState = {
    posts: [],
    challenges: [],
    isLoading: false,
    error: null
};

export const communityReducer = createReducer(
    initialState,
    on(CommunityActions.loadPosts, CommunityActions.createPost, CommunityActions.loadChallenges, (state) => ({ ...state, isLoading: true })),
    on(CommunityActions.loadPostsSuccess, (state, { posts }) => ({ ...state, posts, isLoading: false })),
    on(CommunityActions.createPostSuccess, (state, { post }) => ({ ...state, posts: [post, ...state.posts], isLoading: false })),
    on(CommunityActions.loadChallengesSuccess, (state, { challenges }) => ({ ...state, challenges, isLoading: false })),
    on(CommunityActions.loadPostsFailure, CommunityActions.createPostFailure, CommunityActions.loadChallengesFailure, (state, { error }) => ({ ...state, isLoading: false, error }))
);
