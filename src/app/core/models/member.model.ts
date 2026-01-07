
export interface Member {
    _id?: string;
    name: string;
    memberId: string; // Required per spec
    email: string;
    phone: string;
    gender: 'Male' | 'Female' | 'Other';
    age: number;
    membershipStatus: 'Active' | 'Inactive' | 'Pending' | 'Expired';
    membershipExpiry?: string;
    trainerId?: string;
    gymId: string;
    userId?: string;
}

export interface MemberProgress {
    _id?: string;
    memberId: string;
    weight: number;
    bmi?: number;
    bodyFat?: number;
    date: string;
    gymId: string;
}

export interface Achievement {
    _id?: string;
    memberId: string;
    title: string;
    description?: string;
    earnedDate: string;
    gymId: string;
}
