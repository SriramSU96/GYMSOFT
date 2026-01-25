export interface Attendance {
    _id?: string;
    memberId: string;
    date: Date; // or string, keeping consistency with other models usually string from API
    checkInTime: Date;
    checkOutTime?: Date;
    source: 'QR' | 'Offline' | 'Manual';
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AttendanceStats {
    totalPresent: number;
    totalAbsent: number; // calculated or from API if available
    avgCheckInTime?: string;
}

export interface AttendanceResponse {
    success: boolean;
    count?: number;
    data: Attendance[];
}
