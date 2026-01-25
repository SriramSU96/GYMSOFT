
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MemberService } from '../../services/member.service';
import * as MemberActions from './member.actions';

@Injectable()
export class MemberEffects {
    private actions$ = inject(Actions);
    private memberService = inject(MemberService);

    loadMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.loadMember),
            mergeMap(({ id }) =>
                this.memberService.getMemberById(id).pipe(
                    map((response) => MemberActions.loadMemberSuccess({ member: response.member })),
                    catchError((error) => of(MemberActions.loadMemberFailure({ error })))
                )
            )
        )
    );

    registerMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.registerMember),
            mergeMap(({ member }) =>
                this.memberService.createMember(member).pipe(
                    map((response) => MemberActions.registerMemberSuccess({ member: response.member })),
                    catchError((error) => of(MemberActions.registerMemberFailure({ error })))
                )
            )
        )
    );

    updateMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.updateMember),
            mergeMap(({ id, changes }) =>
                this.memberService.updateMember(id, changes).pipe(
                    map((response) => MemberActions.updateMemberSuccess({ member: response.member })),
                    catchError((error) => of(MemberActions.updateMemberFailure({ error })))
                )
            )
        )
    );

    deleteMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.deleteMember),
            mergeMap(({ id }) =>
                this.memberService.deleteMember(id).pipe(
                    map(() => MemberActions.deleteMemberSuccess({ id })),
                    catchError((error) => of(MemberActions.deleteMemberFailure({ error })))
                )
            )
        )
    );

    addProgress$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.addProgress),
            mergeMap(({ record }) =>
                this.memberService.addProgress(record).pipe(
                    map((response) => MemberActions.addProgressSuccess({ record: response.progress })),
                    catchError((error) => of(MemberActions.addProgressFailure({ error })))
                )
            )
        )
    );

    loadProgress$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.loadProgress),
            mergeMap(({ memberId }) =>
                this.memberService.getProgress(memberId).pipe(
                    map((response) => MemberActions.loadProgressSuccess({ records: response.progress })),
                    catchError((error) => of(MemberActions.loadProgressFailure({ error })))
                )
            )
        )
    );

    assignAchievement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.assignAchievement),
            mergeMap(({ achievement }) =>
                this.memberService.addAchievement(achievement).pipe(
                    map((response) => MemberActions.assignAchievementSuccess({ achievement: response.achievement })),
                    catchError((error) => of(MemberActions.assignAchievementFailure({ error })))
                )
            )
        )
    );

    loadAchievements$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.loadAchievements),
            mergeMap(({ memberId }) =>
                this.memberService.getAchievements(memberId).pipe(
                    map((response) => MemberActions.loadAchievementsSuccess({ achievements: response.achievements })),
                    catchError((error) => of(MemberActions.loadAchievementsFailure({ error })))
                )
            )
        )
    );

    loadMembers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.loadMembers),
            mergeMap(() =>
                this.memberService.getMembers().pipe(
                    map((response) => MemberActions.loadMembersSuccess({ members: response.members })),
                    catchError((error) => of(MemberActions.loadMembersFailure({ error })))
                )
            )
        )
    );
}
