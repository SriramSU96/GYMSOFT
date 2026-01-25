export interface MemberProgress {
    _id?: string;
    memberId: string;
    date: Date;
    weight: number;
    height?: number;
    bodyFat?: number;
    muscleMass?: number;
    notes?: string;
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProgressHistoryResponse {
    success: boolean;
    progressHistory: MemberProgress[];
}

export interface ProgressResponse {
    success: boolean;
    progress: MemberProgress;
}
