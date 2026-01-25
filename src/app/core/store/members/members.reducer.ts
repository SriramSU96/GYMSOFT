import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as MemberActions from './members.actions';
import { Member, Achievement } from '../../models/member.model';
import { MemberProgress } from '../../models/progress.model';

export interface MembersState extends EntityState<Member> {
    members: Member[];
    total: number;
    page: number;
    pages: number;
    selectedMember: Member | null;
    selectedMemberProgress: MemberProgress[];
    selectedMemberAchievements: Achievement[];
    isLoading: boolean;
    error: any;
}

export const adapter: EntityAdapter<Member> = createEntityAdapter<Member>({
    selectId: (member: Member) => member._id,
    sortComparer: false
});

export interface State extends EntityState<Member> {
    total: number;
    page: number;
    pages: number;
    selectedMember: Member | null;
    selectedMemberProgress: MemberProgress[];
    selectedMemberAchievements: Achievement[];
    isLoading: boolean;
    error: any;
}

export const initialState: State = adapter.getInitialState({
    total: 0,
    page: 1,
    pages: 1,
    selectedMember: null,
    selectedMemberProgress: [],
    selectedMemberAchievements: [],
    isLoading: false,
    error: null
});

export const membersReducer = createReducer(
    initialState,

    // Load Members
    on(MemberActions.loadMembers, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(MemberActions.loadMembersSuccess, (state, { response }) => {
        return adapter.setAll(response.members, {
            ...state,
            total: response.total,
            page: response.page,
            pages: response.pages,
            isLoading: false
        });
    }),
    on(MemberActions.loadMembersFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error
    })),

    // Load Single Member
    on(MemberActions.loadMember, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(MemberActions.loadMemberSuccess, (state, { member }) => ({
        ...state,
        selectedMember: member,
        isLoading: false
    })),

    // CRUD Operations
    on(MemberActions.createMemberSuccess, (state, { member }) => adapter.addOne(member, state)),
    on(MemberActions.updateMemberSuccess, (state, { member }) => adapter.updateOne({ id: member._id, changes: member }, state)),
    on(MemberActions.deleteMemberSuccess, (state, { id }) => adapter.removeOne(id, state)),

    // Progress
    on(MemberActions.loadMemberProgressSuccess, (state, { history }) => ({
        ...state,
        selectedMemberProgress: history
    })),
    on(MemberActions.addProgressSuccess, (state, { progress }) => ({
        ...state,
        selectedMemberProgress: [progress, ...state.selectedMemberProgress]
    })),

    // Achievements
    on(MemberActions.loadAchievementsSuccess, (state, { achievements }) => ({
        ...state,
        selectedMemberAchievements: achievements
    }))
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
