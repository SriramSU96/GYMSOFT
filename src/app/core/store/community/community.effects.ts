
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CommunityService } from '../../services/community.service';
import * as CommunityActions from './community.actions';

@Injectable()
export class CommunityEffects {
    private actions$ = inject(Actions);
    private communityService = inject(CommunityService);

    loadPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommunityActions.loadPosts),
            mergeMap(() =>
                this.communityService.getPosts().pipe(
                    map((posts) => CommunityActions.loadPostsSuccess({ posts })),
                    catchError((error) => of(CommunityActions.loadPostsFailure({ error })))
                )
            )
        )
    );

    createPost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommunityActions.createPost),
            mergeMap(({ post }) =>
                this.communityService.createPost(post).pipe(
                    map((newPost) => CommunityActions.createPostSuccess({ post: newPost })),
                    catchError((error) => of(CommunityActions.createPostFailure({ error })))
                )
            )
        )
    );

    loadChallenges$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommunityActions.loadChallenges),
            mergeMap(() =>
                this.communityService.getChallenges().pipe(
                    map((challenges) => CommunityActions.loadChallengesSuccess({ challenges })),
                    catchError((error) => of(CommunityActions.loadChallengesFailure({ error })))
                )
            )
        )
    );
}
