
export interface Payment {
    _id?: string;
    memberId: string;
    invoiceId?: string; // Linked for audit
    source: 'Membership' | 'POS' | 'Class' | 'Other';
    amount: number;
    totalAmount?: number;
    paidAmount?: number;
    dueAmount?: number;
    planId: string;
    paymentDate?: string;
    paymentMethod: string;
    status: 'Paid' | 'Pending' | 'Failed' | 'Partial';
    gymId: string;
}

export interface Coupon {
    _id?: string;
    code: string;
    discountType: 'percentage' | 'flat';
    discountValue: number;
    expiryDate: string;
    usageLimit?: number;
    usedCount?: number;
    usedBy?: string[]; // Tracks personal usage limits: Ref Array: User
    isActive?: boolean;
    gymId: string;
}

export interface Invoice {
    _id?: string;
    memberId: string;
    planId: string;
    amount: number;
    tax?: number;
    total: number;
    paymentId?: string; // Linked after transaction
    date?: string;
    gymId: string;
}
