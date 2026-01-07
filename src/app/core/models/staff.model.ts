
export interface Staff {
    _id?: string;
    name: string;
    role: string;
    salary: number;
    phone?: string;
    userId?: string;
    gymId: string;
    isActive: boolean;
}

export interface StaffAttendance {
    _id?: string;
    staffId: string;
    date?: string;
    status: 'Present' | 'Absent' | 'Leave' | 'Half-Day';
    checkInTime?: string;
    checkOutTime?: string;
    gymId: string;
}

export interface Salary {
    _id?: string;
    staffId: string;
    amount: number;
    paymentDate?: string;
    month: number; // 1-12
    year: number;
    status: 'Paid' | 'Pending';
    gymId: string;
}
