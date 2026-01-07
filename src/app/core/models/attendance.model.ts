
export interface Attendance {
    _id?: string;
    memberId: string;
    date: string;
    checkInTime: string;
    checkOutTime?: string;
    source: 'QR' | 'Offline' | 'Manual';
    gymId: string;
}
