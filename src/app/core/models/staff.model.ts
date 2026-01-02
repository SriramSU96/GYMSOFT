
export interface Staff {
    id: string;
    name: string;
    role: string;
    salary: number;
    phone: string;
    userId?: string;
    gymId: string;
}

export interface StaffAttendance {
    id: string;
    staffId: string;
    date: string;
    status: 'present' | 'absent' | 'leave';
    checkInTime?: string;
    gymId: string;
}

export interface Salary {
    id: string;
    staffId: string;
    amount: number;
    paymentDate: string;
    month: string;
    year: number;
    status: 'paid' | 'pending';
    gymId: string;
}
