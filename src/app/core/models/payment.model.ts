
export interface Payment {
    id: string;
    memberId: string;
    amount: number;
    totalAmount: number; // Backend field
    paidAmount: number;  // Backend field
    dueAmount: number;   // Backend field
    planId?: string;
    paymentDate: string; // Backend said 'date' in some, 'paymentDate' in others. Sticking to backend spec 'paymentDate'
    paymentMethod: string;
    status: 'pending' | 'completed' | 'overdue' | 'paid'; // 'paid' or 'completed'? Backend says 'status'.
    gymId: string;
}

export interface Coupon {
    id: string;
    code: string;
    discountType: 'percentage' | 'flat'; // Backend field
    discountValue: number; // Backend field
    expiryDate: string;
    usageLimit: number;
    usedCount: number; // Backend field 'usedCount'
    gymId: string;
}

export interface InvoiceItem {
    description: string;
    amount: number;
}

export interface Invoice {
    id: string;
    memberId: string;
    planId: string;
    amount: number;
    tax: number;
    total: number;
    date: string;
    gymId: string;
    member?: {
        name: string;
        address: string;
        email: string;
    };
    items?: InvoiceItem[];
    status?: string;
}
