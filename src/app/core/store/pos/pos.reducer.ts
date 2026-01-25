import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product, Sale } from '../../models/pos.model';
import * as PosActions from './pos.actions';

export interface PosState extends EntityState<Product> {
    loading: boolean;
    error: any;
    totalProducts: number;
    salesHistory: Sale[];
    salesLoading: boolean;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
    selectId: (p) => p._id || '',
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

export const initialState: PosState = adapter.getInitialState({
    loading: false,
    error: null,
    totalProducts: 0,
    salesHistory: [],
    salesLoading: false
});

export const posReducer = createReducer(
    initialState,

    // Load Products
    on(PosActions.loadProducts, (state) => ({ ...state, loading: true, error: null })),
    on(PosActions.loadProductsSuccess, (state, { response }) =>
        adapter.setAll(response.data, { ...state, loading: false, totalProducts: response.count || 0 })
    ),
    on(PosActions.loadProductsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // CRUD
    on(PosActions.createProduct,
        PosActions.updateProduct,
        PosActions.deleteProduct,
        PosActions.adjustStock,
        (state) => ({ ...state, loading: true, error: null })),

    on(PosActions.createProductSuccess, (state, { product }) =>
        adapter.addOne(product, { ...state, loading: false })
    ),
    on(PosActions.updateProductSuccess, (state, { update }) =>
        adapter.updateOne(update, { ...state, loading: false })
    ),
    on(PosActions.deleteProductSuccess, (state, { id }) =>
        adapter.removeOne(id, { ...state, loading: false })
    ),
    on(PosActions.adjustStockSuccess, (state, { product }) =>
        adapter.upsertOne(product, { ...state, loading: false })
    ),

    on(PosActions.createProductFailure,
        PosActions.updateProductFailure,
        PosActions.deleteProductFailure,
        PosActions.adjustStockFailure,
        (state, { error }) => ({ ...state, loading: false, error })),

    // Sales
    on(PosActions.processSale, (state) => ({ ...state, salesLoading: true, error: null })),
    on(PosActions.processSaleSuccess, (state, { sale }) => ({
        ...state,
        salesLoading: false,
        salesHistory: [sale, ...state.salesHistory] // Optimistic add to history
    })),
    on(PosActions.processSaleFailure, (state, { error }) => ({ ...state, salesLoading: false, error })),

    on(PosActions.loadSalesHistory, (state) => ({ ...state, salesLoading: true, error: null })),
    on(PosActions.loadSalesHistorySuccess, (state, { response }) => ({
        ...state,
        salesLoading: false,
        salesHistory: response.data
    })),
    on(PosActions.loadSalesHistoryFailure, (state, { error }) => ({ ...state, salesLoading: false, error }))
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
