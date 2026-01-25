export interface Payment {
    _id?: string;
    memberId: string;
    invoiceId?: string;
    source: 'Membership' | 'POS' | 'Class' | 'Other';
    amount: number;
    currency: string;
    transactionId?: string; // e.g. Stripe ID
    method: 'Cash' | 'Card' | 'Online' | 'Bank Transfer' | 'Other';
    status: 'Paid' | 'Pending' | 'Failed' | 'Refunded' | 'Partial';
    paymentDate?: Date;
    notes?: string;
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
    dueAmount?: number; // For pending dues
}

export interface Invoice {
    _id?: string;
    invoiceNumber: string;
    memberId: string;
    items: InvoiceItem[];
    subTotal: number;
    tax?: number;
    taxRate?: number; // percentage
    discount?: number;
    total: number;
    status: 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Void';
    dueDate?: Date;
    date: Date;
    paymentId?: string;
    gymId: string;
    createdAt?: Date;
    amount?: number; // Total amount alias
    planId?: string;
}

export interface InvoiceItem {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

// Coupon moved to coupon.model.ts

export interface PaymentResponse {
    success: boolean;
    count?: number;
    data: Payment[];
}

export interface InvoiceResponse {
    success: boolean;
    count?: number;
    data: Invoice[];
}

export interface PaymentFilter {
    memberId?: string;
    startDate?: string;
    endDate?: string;
    status?: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
    source?: string;
}

export interface InvoiceFilter {
    memberId?: string;
    startDate?: string;
    endDate?: string;
    status?: 'Paid' | 'Pending' | 'Overdue';
}
