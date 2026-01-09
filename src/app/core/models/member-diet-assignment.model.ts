import { DietPlan } from './gym-extensions.model';
import { Member } from './member.model';

export interface MemberDietAssignment {
    _id?: string;
    memberId: string;
    member?: Member; // Populated member data
    dietPlanId: string;
    dietPlan?: DietPlan; // Populated diet plan data
    startDate: Date;
    endDate?: Date;
    status: 'Active' | 'Expired' | 'Upcoming';
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
    gymId: string;
}

export interface AssignDietPlanRequest {
    memberId: string;
    dietPlanId: string;
    startDate: Date;
    endDate?: Date;
    notes?: string;
}
