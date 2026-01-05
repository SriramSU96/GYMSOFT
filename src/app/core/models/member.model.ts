
export interface Member {
    id: string;
    _id?: string; // MongoDB alias
    memberId?: string; // Custom ID alias
    name: string;
    email: string;
    phone: string;
    gender: 'Male' | 'Female' | 'Other';
    age: number;
    membershipStatus: 'Active' | 'Inactive' | 'Pending' | 'Expired';
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
