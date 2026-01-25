export interface GymClass {
    _id?: string;
    title: string;
    description?: string;
    trainerId: string; // User ID
    trainerName?: string; // Snapshot for display
    type: 'Yoga' | 'HIIT' | 'Cardio' | 'Strength' | 'Pilates' | 'Zumba' | 'Other';
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
    scheduleDate: Date;
    startTime: string; // "10:00 AM"
    duration: number; // minutes
    capacity: number;
    enrolledCount: number;
    status: 'Scheduled' | 'Cancelled' | 'Completed';
    room?: string;
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Booking {
    _id?: string;
    classId: string;
    className?: string; // Snapshot
    classDate?: Date; // Snapshot
    memberId: string;
    memberName?: string; // Snapshot
    status: 'Confirmed' | 'Waitlisted' | 'Cancelled' | 'CheckedIn';
    bookingDate: Date;
    gymId: string;
}

export interface ClassFilter {
    trainerId?: string;
    startDate?: string;
    endDate?: string;
    type?: string;
    status?: string;
}

export interface BookingFilter {
    memberId?: string;
    classId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
}

export interface ClassResponse {
    success: boolean;
    count?: number;
    data: GymClass[];
}

export interface BookingResponse {
    success: boolean;
    count?: number;
    data: Booking[];
}
