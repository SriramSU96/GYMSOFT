export interface Coupon {
    _id?: string;
    code: string;
    description?: string;
    discountType: 'percentage' | 'flat';
    discountValue: number; // e.g., 10 for 10% or $10
    minOrderValue?: number;
    maxDiscount?: number; // Cap for percentage
    validFrom?: Date;
    expiryDate: Date;
    usageLimit?: number; // Total usages allowed
    usedCount?: number;
    isActive: boolean;
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CouponFilter {
    code?: string;
    isActive?: boolean;
    startDate?: string;
    endDate?: string;
}
