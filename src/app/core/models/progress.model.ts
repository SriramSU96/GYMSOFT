export interface MemberProgress {
    _id?: string;
    memberId: string;
    date: Date;
    recordedDate?: Date; // Alias for date
    weight: number;
    height?: number;
    bodyFat?: number;
    muscleMass?: number;
    bmi?: number;
    metrics?: { [key: string]: number };
    notes?: string;
    recordedBy?: string;
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProgressRecord extends MemberProgress { }

export interface MemberProgressSummary {
    memberId?: string;
    memberName?: string;
    phone?: string;
    age?: number;
    fitnessGoal?: string;
    startingWeight: number;
    currentWeight: number;
    weightChange: number;
    currentBMI?: number;
    bmiChange?: number;
    attendanceCount: number;
    totalRecords?: number;
    progressStatus?: 'Improving' | 'Stable' | 'Needs Attention';
    trend: 'up' | 'down' | 'stable';
}

export interface ProgressHistoryResponse {
    success: boolean;
    progressHistory: MemberProgress[];
}

export interface ProgressResponse {
    success: boolean;
    progress: MemberProgress;
}
