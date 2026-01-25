import { createAction, props } from '@ngrx/store';
import { Member, MembersResponse, Achievement } from '../../models/member.model';
import { MemberProgress, ProgressHistoryResponse } from '../../models/progress.model';

// Load Members
export const loadMembers = createAction('[Members] Load Members', props<{ params: any }>());
export const loadMembersSuccess = createAction('[Members] Load Members Success', props<{ response: MembersResponse }>());
export const loadMembersFailure = createAction('[Members] Load Members Failure', props<{ error: any }>());

// Load Single Member
export const loadMember = createAction('[Members] Load Member', props<{ id: string }>());
export const loadMemberSuccess = createAction('[Members] Load Member Success', props<{ member: Member }>());
export const loadMemberFailure = createAction('[Members] Load Member Failure', props<{ error: any }>());

// Create Member
export const createMember = createAction('[Members] Create Member', props<{ member: Partial<Member> }>());
export const createMemberSuccess = createAction('[Members] Create Member Success', props<{ member: Member }>());
export const createMemberFailure = createAction('[Members] Create Member Failure', props<{ error: any }>());

// Update Member
export const updateMember = createAction('[Members] Update Member', props<{ id: string, member: Partial<Member> }>());
export const updateMemberSuccess = createAction('[Members] Update Member Success', props<{ member: Member }>());
export const updateMemberFailure = createAction('[Members] Update Member Failure', props<{ error: any }>());

// Delete Member
export const deleteMember = createAction('[Members] Delete Member', props<{ id: string }>());
export const deleteMemberSuccess = createAction('[Members] Delete Member Success', props<{ id: string }>());
export const deleteMemberFailure = createAction('[Members] Delete Member Failure', props<{ error: any }>());

// QR Codes
export const generateQr = createAction('[Members] Generate QR', props<{ id: string }>());
export const generateQrSuccess = createAction('[Members] Generate QR Success', props<{ id: string, qrToken: string, qrGeneratedAt: Date }>());
export const generateQrFailure = createAction('[Members] Generate QR Failure', props<{ error: any }>());

// Progress
export const loadMemberProgress = createAction('[Members] Load Progress', props<{ memberId: string }>());
export const loadMemberProgressSuccess = createAction('[Members] Load Progress Success', props<{ history: MemberProgress[] }>());
export const loadMemberProgressFailure = createAction('[Members] Load Progress Failure', props<{ error: any }>());

export const addProgress = createAction('[Members] Add Progress', props<{ progress: Partial<MemberProgress> }>());
export const addProgressSuccess = createAction('[Members] Add Progress Success', props<{ progress: MemberProgress }>());
export const addProgressFailure = createAction('[Members] Add Progress Failure', props<{ error: any }>());

// Achievements
export const loadAchievements = createAction('[Members] Load Achievements', props<{ memberId: string }>());
export const loadAchievementsSuccess = createAction('[Members] Load Achievements Success', props<{ achievements: Achievement[] }>());
export const loadAchievementsFailure = createAction('[Members] Load Achievements Failure', props<{ error: any }>());
