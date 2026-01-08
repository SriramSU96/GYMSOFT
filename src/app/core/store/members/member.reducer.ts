
import { createReducer, on } from '@ngrx/store';
import * as MemberActions from './member.actions';
import { Member, MemberProgress, Achievement } from '../../models/member.model';

export interface MemberState {
    members: Member[];
    currentMember: Member | null;
    progressHistory: MemberProgress[];
    achievements: Achievement[];
    isLoading: boolean;
    error: any;
}

export const initialState: MemberState = {
    members: [],
    currentMember: null,
    progressHistory: [],
    achievements: [],
    isLoading: false,
    error: null
};

export const memberReducer = createReducer(
    initialState,
    // Load/Register/Update Member
    on(MemberActions.loadMember, MemberActions.registerMember, MemberActions.updateMember, MemberActions.loadMembers, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(MemberActions.loadMemberSuccess, MemberActions.registerMemberSuccess, MemberActions.updateMemberSuccess, (state, { member }) => ({
        ...state,
        currentMember: member,
        isLoading: false
    })),
    on(MemberActions.loadMembersSuccess, (state, { members }) => ({
        ...state,
        members,
        isLoading: false
    })),
    // Delete Member
    on(MemberActions.deleteMember, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(MemberActions.deleteMemberSuccess, (state, { id }) => ({
        ...state,
        members: state.members.filter(m => m._id !== id),
        isLoading: false
    })),
    // Progress
    on(MemberActions.addProgress, MemberActions.loadProgress, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(MemberActions.addProgressSuccess, (state, { record }) => ({
        ...state,
        progressHistory: [...state.progressHistory, record],
        isLoading: false
    })),
    on(MemberActions.loadProgressSuccess, (state, { records }) => ({
        ...state,
        progressHistory: records,
        isLoading: false
    })),
    // Achievements
    on(MemberActions.assignAchievement, MemberActions.loadAchievements, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(MemberActions.assignAchievementSuccess, (state, { achievement }) => ({
        ...state,
        achievements: [...state.achievements, achievement],
        isLoading: false
    })),
    on(MemberActions.loadAchievementsSuccess, (state, { achievements }) => ({
        ...state,
        achievements: achievements,
        isLoading: false
    })),
    // Failures
    on(MemberActions.loadMemberFailure, MemberActions.registerMemberFailure, MemberActions.updateMemberFailure,
        MemberActions.deleteMemberFailure,
        MemberActions.addProgressFailure, MemberActions.loadProgressFailure,
        MemberActions.assignAchievementFailure, MemberActions.loadAchievementsFailure, (state, { error }) => ({
            ...state,
            isLoading: false,
            error
        }))
);
