
export interface Attendance {
    id: string;
    memberId: string;
    date: string;
    checkInTime: string;
    checkOutTime?: string;
    source: string; // e.g., 'qr', 'manual'
    gymId: string;
}
