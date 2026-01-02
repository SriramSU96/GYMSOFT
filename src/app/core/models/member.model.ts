
export interface Member {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: 'male' | 'female' | 'other';
    age: number;
    membershipStatus: 'active' | 'expired' | 'pending';
    membershipExpiry: string;
    trainerId?: string;
    gymId: string;
    userId?: string; // Linked User account
}

export interface MemberProgress {
    id: string;
    memberId: string;
    weight: number;
    bmi: number;
    bodyFat?: number;
    date: string;
    gymId: string;
}

export interface Achievement {
    id: string;
    memberId: string;
    title: string;
    description: string;
    earnedDate: string; // Changed from dateEarned to match convention or keep if backend sends 'earnedDate'
    gymId: string;
}
