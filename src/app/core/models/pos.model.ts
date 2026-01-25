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
    category: string; // e.g., 'Supplement', 'Merchandise', or ref ID
    price: number;
    costPrice?: number;
    stock: number;
    minStockLevel?: number;
    isLowStock?: boolean; // Computable on frontend or backend
    images?: string[];
    isActive: boolean;
    gymId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SaleItem {
    productId: string;
    productName: string; // Snapshot
    quantity: number;
    unitPrice: number; // Snapshot
    total: number;
}

export interface Sale {
    _id?: string;
    items: SaleItem[];
    subTotal: number;
    discount?: number;
    tax?: number;
    total: number;
    paymentMethod: 'Cash' | 'Card' | 'Online' | 'Other';
    status: 'Completed' | 'Refunded' | 'Cancelled';
    soldBy: string; // Staff/User ID
    memberId?: string; // Optional linkage
    date: Date;
    gymId: string;
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
