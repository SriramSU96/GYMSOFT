export interface ProductCategory {
    _id?: string;
    name: string;
    description?: string;
    gymId: string;
}

export interface Product {
    _id?: string;
    name: string;
    sku?: string;
    description?: string;
    category: string; // e.g., 'Supplements', 'Drinks', 'Accessories', 'Merchandise', 'Other'
    price: number;
    costPrice?: number;
    stockQuantity: number;
    reorderLevel?: number;
    unit?: 'Piece' | 'Bottle' | 'Pack' | 'Box' | 'Kg';
    isLowStock?: boolean; // Computable on frontend or backend
    images?: string[];
    isActive: boolean;
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProductFilter {
    category?: string;
    search?: string;
    isActive?: boolean;
    lowStock?: boolean;
}

export interface SaleItem {
    productId: string;
    productName: string; // Snapshot
    quantity: number;
    unitPrice: number; // Snapshot
    totalPrice: number;
}

export interface Sale {
    _id?: string;
    saleNumber: string;
    items: SaleItem[];
    subTotal: number;
    discount?: number;
    tax?: number;
    grandTotal: number;
    paymentMethod: 'Cash' | 'Card' | 'UPI';
    status: 'Paid' | 'Pending' | 'Refunded';
    soldBy: string; // Staff/User ID
    memberId?: string; // Optional linkage
    date: Date;
    gymId: string;
}

export interface SaleFilter {
    startDate?: string;
    endDate?: string;
    memberId?: string;
    status?: string;
    paymentMethod?: string;
}

export interface StockAdjustment {
    productId: string;
    adjustment: number; // Positive (add) or Negative (remove)
    reason: string;
    type: 'Restock' | 'Correction' | 'Damaged' | 'Sold' | 'Return';
    date: Date;
    performedBy: string;

}

export interface ProductResponse {
    success: boolean;
    count?: number;
    data: Product[];
}

export interface SaleResponse {
    success: boolean;
    count?: number;
    data: Sale[];
}
