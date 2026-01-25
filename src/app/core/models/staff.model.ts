export interface Staff {
    _id: string;
    name: string;
    role: string; // 'Trainer' | 'Receptionist' | 'Cleaner' | 'Manager'
    salary: number;
    phone?: string;
    userId?: string;
    gymId: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface StaffAttendance {
    _id?: string;
    staffId: string;
    date: Date;
    status: 'Present' | 'Absent' | 'Leave' | 'Half-Day';
    checkInTime?: string;
    checkOutTime?: string;
    workingHours?: number;
    remarks?: string;
    markedBy?: string;
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface StaffSalaryConfig {
    _id?: string;
    staffId: string;
    baseSalary: number;
    allowances: number;
    deductions: number;
    perDaySalary?: number;
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface StaffSalaryRecord {
    _id?: string;
    staffId: string;
    month: number;
    year: number;
    baseSalary: number;
    allowances: number;
    deductions: number;
    totalDays?: number;
    presentDays?: number;
    absentDays?: number;
    leaveDays?: number;
    finalAmount: number;
    status: 'Generated' | 'Paid';
    paidOn?: Date;
    paidBy?: string;
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface StaffResponse {
    success: boolean;
    staff: Staff;
}

export interface StaffListResponse {
    success: boolean;
    staff: Staff[];
}
