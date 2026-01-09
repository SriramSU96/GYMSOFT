export interface ProgressRecord {
    _id?: string;
    memberId: string;
    weight: number; // in kg
    bmi: number;
    bodyFat?: number; // percentage
    muscleMass?: number; // in kg
    measurements?: {
        chest?: number;
        waist?: number;
        hips?: number;
        arms?: number;
        thighs?: number;
    };
    notes?: string;
    recordedBy: string; // User ID (trainer/admin)
    recordedDate: Date;
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface MemberProgressSummary {
    memberId: string;
    memberName: string;
    phone: string;
    age: number;
    fitnessGoal: string;
    currentWeight: number;
    currentBMI: number;
    progressStatus: 'Improving' | 'Stable' | 'Needs Attention';
    totalRecords: number;
    latestRecord?: ProgressRecord;
    firstRecord?: ProgressRecord;
    weightChange?: number; // kg lost/gained since start
    bmiChange?: number;
}

export interface CreateProgressRequest {
    memberId: string;
    weight: number;
    bmi: number;
    bodyFat?: number;
    muscleMass?: number;
    measurements?: {
        chest?: number;
        waist?: number;
        hips?: number;
        arms?: number;
        thighs?: number;
    };
    notes?: string;
}
