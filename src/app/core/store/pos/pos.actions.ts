import { createAction, props } from '@ngrx/store';
import { Product, ProductFilter, ProductResponse, Sale, SaleFilter, SaleResponse, StockAdjustment } from '../../models/pos.model';
import { Update } from '@ngrx/entity';

// Products
export const loadProducts = createAction(
    '[POS] Load Products',
    props<{ filter?: ProductFilter }>()
);

export const loadProductsSuccess = createAction(
    '[POS] Load Products Success',
    props<{ response: ProductResponse }>()
);

export const loadProductsFailure = createAction(
    '[POS] Load Products Failure',
    props<{ error: any }>()
);

// Create
export const createProduct = createAction(
    '[POS] Create Product',
    props<{ product: Partial<Product> }>()
);

export const createProductSuccess = createAction(
    '[POS] Create Product Success',
    props<{ product: Product }>()
);

export const createProductFailure = createAction(
    '[POS] Create Product Failure',
    props<{ error: any }>()
);

// Update
export const updateProduct = createAction(
    '[POS] Update Product',
    props<{ id: string; updates: Partial<Product> }>()
);

export const updateProductSuccess = createAction(
    '[POS] Update Product Success',
    props<{ update: Update<Product> }>()
);

export const updateProductFailure = createAction(
    '[POS] Update Product Failure',
    props<{ error: any }>()
);

// Delete
export const deleteProduct = createAction(
    '[POS] Delete Product',
    props<{ id: string }>()
);

export const deleteProductSuccess = createAction(
    '[POS] Delete Product Success',
    props<{ id: string }>()
);

export const deleteProductFailure = createAction(
    '[POS] Delete Product Failure',
    props<{ error: any }>()
);

// Stock
export const adjustStock = createAction(
    '[POS] Adjust Stock',
    props<{ id: string; adjustment: Partial<StockAdjustment> }>()
);

export const adjustStockSuccess = createAction(
    '[POS] Adjust Stock Success',
    props<{ product: Product }>()
);

export const adjustStockFailure = createAction(
    '[POS] Adjust Stock Failure',
    props<{ error: any }>()
);

// Sales
export const processSale = createAction(
    '[POS] Process Sale',
    props<{ sale: Partial<Sale> }>()
);

export const processSaleSuccess = createAction(
    '[POS] Process Sale Success',
    props<{ sale: Sale }>()
);

export const processSaleFailure = createAction(
    '[POS] Process Sale Failure',
    props<{ error: any }>()
);

export const loadSalesHistory = createAction(
    '[POS] Load Sales History',
    props<{ filter?: SaleFilter }>()
);

export const loadSalesHistorySuccess = createAction(
    '[POS] Load Sales History Success',
    props<{ response: SaleResponse }>()
);

export const loadSalesHistoryFailure = createAction(
    '[POS] Load Sales History Failure',
    props<{ error: any }>()
);
