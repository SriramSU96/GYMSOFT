import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { MemberService } from '../../services/member.service';
import { ProgressService } from '../../services/progress.service';
import * as MemberActions from './members.actions';

@Injectable()
export class MemberEffects {
    private actions$ = inject(Actions);
    private memberService = inject(MemberService);
    private progressService = inject(ProgressService);

    loadMembers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.loadMembers),
            switchMap((action) =>
                this.memberService.getMembers(action.params).pipe(
                    map((response) => MemberActions.loadMembersSuccess({ response })),
                    catchError((error) => of(MemberActions.loadMembersFailure({ error })))
                )
            )
        )
    );

    loadMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.loadMember),
            mergeMap((action) =>
                this.memberService.getMemberById(action.id).pipe(
                    map((response) => MemberActions.loadMemberSuccess({ member: response.member })),
                    catchError((error) => of(MemberActions.loadMemberFailure({ error })))
                )
            )
        )
    );

    createMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.createMember),
            mergeMap((action) =>
                this.memberService.createMember(action.member).pipe(
                    map((response) => MemberActions.createMemberSuccess({ member: response.member })),
                    catchError((error) => of(MemberActions.createMemberFailure({ error })))
                )
            )
        )
    );

    updateMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.updateMember),
            mergeMap((action) =>
                this.memberService.updateMember(action.id, action.member).pipe(
                    map((response) => MemberActions.updateMemberSuccess({ member: response.member })),
                    catchError((error) => of(MemberActions.updateMemberFailure({ error })))
                )
            )
        )
    );

    deleteMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.deleteMember),
            mergeMap((action) =>
                this.memberService.deleteMember(action.id).pipe(
                    map(() => MemberActions.deleteMemberSuccess({ id: action.id })),
                    catchError((error) => of(MemberActions.deleteMemberFailure({ error })))
                )
            )
        )
    );

    // QR Codes
    generateQr$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.generateQr),
            mergeMap((action) =>
                this.memberService.generateQr(action.id).pipe(
                    map((response) => MemberActions.generateQrSuccess({
                        id: action.id,
                        qrToken: response.qrToken,
                        qrGeneratedAt: response.qrGeneratedAt
                    })),
                    catchError((error) => of(MemberActions.generateQrFailure({ error })))
                )
            )
        )
    );

    // Progress
    loadProgress$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.loadMemberProgress),
            mergeMap((action) =>
                this.progressService.getProgressHistory(action.memberId).pipe(
                    map((response) => MemberActions.loadMemberProgressSuccess({ history: response.progressHistory })),
                    catchError((error) => of(MemberActions.loadMemberProgressFailure({ error })))
                )
            )
        )
    );

    addProgress$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.addProgress),
            mergeMap((action) =>
                this.progressService.addProgress(action.progress).pipe(
                    map((response) => MemberActions.addProgressSuccess({ progress: response.progress })),
                    catchError((error) => of(MemberActions.addProgressFailure({ error })))
                )
            )
        )
    );

    // Achievements
    loadAchievements$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MemberActions.loadAchievements),
            mergeMap((action) =>
                this.memberService.getAchievements(action.memberId).pipe(
                    map((response) => MemberActions.loadAchievementsSuccess({ achievements: response.achievements })),
                    catchError((error) => of(MemberActions.loadAchievementsFailure({ error })))
                )
            )
        )
    );
}
