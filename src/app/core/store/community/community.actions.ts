
import { createAction, props } from '@ngrx/store';
import { Post, Challenge } from '../../models/community.model';

export const loadPosts = createAction('[Community] Load Posts');
export const loadPostsSuccess = createAction('[Community] Load Posts Success', props<{ posts: Post[] }>());
export const loadPostsFailure = createAction('[Community] Load Posts Failure', props<{ error: any }>());

export const createPost = createAction('[Community] Create Post', props<{ post: Partial<Post> }>());
export const createPostSuccess = createAction('[Community] Create Post Success', props<{ post: Post }>());
export const createPostFailure = createAction('[Community] Create Post Failure', props<{ error: any }>());

export const loadChallenges = createAction('[Community] Load Challenges');
export const loadChallengesSuccess = createAction('[Community] Load Challenges Success', props<{ challenges: Challenge[] }>());
export const loadChallengesFailure = createAction('[Community] Load Challenges Failure', props<{ error: any }>());
