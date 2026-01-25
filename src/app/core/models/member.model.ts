export interface Member {
    _id: string; // Made required as it's the primary key from backend
    name: string;
    memberId?: string; // sparse in backend
    email: string;
    phone: string;
    gender: 'Male' | 'Female' | 'Other';
    age: number;
    membershipStatus: 'Active' | 'Inactive' | 'Pending' | 'Expired';
    membershipExpiry?: Date; // typed as Date
    trainerId?: string;
    gymId: string;
    userId?: string;
    qrToken?: string;
    qrGeneratedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Achievement {
    _id: string;
    memberId: string;
    title: string;
    description?: string;
    date: Date; // backend calls it 'date'
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface MemberProgress {
    _id?: string;
    memberId: string;
    date: Date;
    weight?: number;
    bmi?: number;
    bodyFat?: number;
    notes?: string;
    metrics?: Record<string, number>;
}

export interface MemberResponse {
    success: boolean;
    member: Member;
}

export interface MembersResponse {
    success: boolean;
    members: Member[];
    page: number;
    pages: number;
    total: number;
}
