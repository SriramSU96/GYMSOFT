
import { createAction, props } from '@ngrx/store';
import { Member, MemberProgress, Achievement } from '../../models/member.model';

// Member Profile
export const loadMember = createAction('[Member] Load Member', props<{ id: string }>());
export const loadMemberSuccess = createAction('[Member] Load Member Success', props<{ member: Member }>());
export const loadMemberFailure = createAction('[Member] Load Member Failure', props<{ error: any }>());

export const loadMembers = createAction('[Member] Load Members', props<{ gymId: string }>());
export const loadMembersSuccess = createAction('[Member] Load Members Success', props<{ members: Member[] }>());
export const loadMembersFailure = createAction('[Member] Load Members Failure', props<{ error: any }>());

export const registerMember = createAction('[Member] Register Member', props<{ member: Partial<Member> }>());
export const registerMemberSuccess = createAction('[Member] Register Member Success', props<{ member: Member }>());
export const registerMemberFailure = createAction('[Member] Register Member Failure', props<{ error: any }>());

export const updateMember = createAction('[Member] Update Member', props<{ id: string, changes: Partial<Member> }>());
export const updateMemberSuccess = createAction('[Member] Update Member Success', props<{ member: Member }>());
export const updateMemberFailure = createAction('[Member] Update Member Failure', props<{ error: any }>());

// Progress
export const addProgress = createAction('[Member] Add Progress', props<{ record: Partial<MemberProgress> }>());
export const addProgressSuccess = createAction('[Member] Add Progress Success', props<{ record: MemberProgress }>());
export const addProgressFailure = createAction('[Member] Add Progress Failure', props<{ error: any }>());

export const loadProgress = createAction('[Member] Load Progress', props<{ memberId: string }>());
export const loadProgressSuccess = createAction('[Member] Load Progress Success', props<{ records: MemberProgress[] }>());
export const loadProgressFailure = createAction('[Member] Load Progress Failure', props<{ error: any }>());

// Achievements
export const assignAchievement = createAction('[Member] Assign Achievement', props<{ achievement: Partial<Achievement> }>());
export const assignAchievementSuccess = createAction('[Member] Assign Achievement Success', props<{ achievement: Achievement }>());
export const assignAchievementFailure = createAction('[Member] Assign Achievement Failure', props<{ error: any }>());

export const loadAchievements = createAction('[Member] Load Achievements', props<{ memberId: string }>());
export const loadAchievementsSuccess = createAction('[Member] Load Achievements Success', props<{ achievements: Achievement[] }>());
export const loadAchievementsFailure = createAction('[Member] Load Achievements Failure', props<{ error: any }>());
