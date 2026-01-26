
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PosService } from '../../../core/services/pos.service';
import { AuthService } from '../../../core/services/auth.service';
import { Product } from '../../../core/models/pos.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

// Extended Interface for UI Logic
interface ExtendedProduct extends Product {
    sku?: string;
    costPrice?: number;
    reorderLevel?: number;
    unit?: 'Piece' | 'Bottle' | 'Pack' | 'Box' | 'Kg';
    description?: string;
}

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, CurrencyPipe],
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductList implements OnInit {
    products: ExtendedProduct[] = [];
    filteredProducts: ExtendedProduct[] = [];

    // Forms
    productForm: FormGroup;
    stockForm: FormGroup;

    // Loading State
    isLoading = false;
    isSubmitting = false;

    // Modals
    showProductModal = false;
    showStockModal = false;
    isEditing = false;

    // Selected Product for Actions
    selectedProduct: ExtendedProduct | null = null;

    // Filters
    searchQuery: string = '';
    filterCategory: string = 'All';
    showLowStockOnly: boolean = false;

    categories = ['Supplement', 'Drink', 'Gear', 'Apparel', 'Accessories', 'Other'];

    constructor(
        private posService: PosService,
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.productForm = this.fb.group({
            name: ['', Validators.required],
            category: ['Supplements', Validators.required],
            sku: ['', Validators.required],
            price: [0, [Validators.required, Validators.min(0)]],
            costPrice: [0, [Validators.required, Validators.min(0)]],
            stockQuantity: [0, [Validators.required, Validators.min(0)]],
            reorderLevel: [5, [Validators.required, Validators.min(0)]],
            unit: ['Piece', Validators.required],
            description: [''],
            isActive: [true]
        });

        this.stockForm = this.fb.group({
            adjustment: [0, Validators.required], // Can be negative
            reason: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.loadProducts();
    }

    // --- Data Loading & Metrics ---

    loadProducts(): void {
        const user = this.authService.currentUserValue;
        if (!user || !user.gymId) return;

        this.isLoading = true;
        this.posService.getProducts().subscribe({
            next: (data: any) => {
                // Map and extend with mock data if missing (simulating enterprise fields)
                this.products = (data.data || []).map((p: any) => ({
                    ...p,
                    sku: p.sku || `SKU-${p.name.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
                    costPrice: p.costPrice || Math.round(p.price * 0.6),
                    reorderLevel: p.reorderLevel || 10,
                    unit: p.unit || 'Piece',
                    description: p.description || '',
                    isActive: p.isActive !== undefined ? p.isActive : true
                }));
                this.applyFilters();
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }

    get totalInventoryValue(): number {
        return this.products.reduce((acc, p) => acc + (p.stockQuantity * (p.costPrice || 0)), 0);
    }

    get lowStockCount(): number {
        return this.products.filter(p => p.stockQuantity <= (p.reorderLevel || 5)).length;
    }

    // --- Filtering ---

    applyFilters() {
        this.filteredProducts = this.products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                (p.sku && p.sku.toLowerCase().includes(this.searchQuery.toLowerCase()));
            const matchesCategory = this.filterCategory === 'All' || p.category === this.filterCategory;
            const matchesLowStock = !this.showLowStockOnly || p.stockQuantity <= (p.reorderLevel || 5);

            return matchesSearch && matchesCategory && matchesLowStock;
        });
    }

    // --- Modal Actions ---

    openProductModal(product?: ExtendedProduct): void {
        this.showProductModal = true;
        if (product) {
            this.isEditing = true;
            this.selectedProduct = product;
            this.productForm.patchValue({
                ...product
            });
        } else {
            this.isEditing = false;
            this.selectedProduct = null;
            this.productForm.reset({
                category: 'Supplements',
                stockQuantity: 0,
                reorderLevel: 5,
                unit: 'Piece',
                isActive: true,
                price: 0,
                costPrice: 0
            });
        }
    }

    openStockModal(product: ExtendedProduct): void {
        this.selectedProduct = product;
        this.stockForm.reset({ adjustment: 0, reason: 'Restock' });
        this.showStockModal = true;
    }

    closeModals(): void {
        this.showProductModal = false;
        this.showStockModal = false;
        this.selectedProduct = null;
    }

    // --- CRUD Operations ---

    onProductSubmit(): void {
        if (this.productForm.invalid) return;

        this.isSubmitting = true;
        const user = this.authService.currentUserValue;
        const formValue = this.productForm.value;

        // Ensure numeric values
        const productData = {
            ...formValue,
            gymId: user?.gymId,
            price: Number(formValue.price),
            stockQuantity: Number(formValue.stockQuantity),
            // In a real scenario, we'd send the extended fields to the API.
            // Since the interface is restricted, we'll just send what we can or mock the local update.
        };

        if (this.isEditing && this.selectedProduct?._id) {
            this.posService.updateProduct(this.selectedProduct._id, productData).subscribe({
                next: () => {
                    this.finishSave();
                },
                error: (err) => {
                    console.error(err);
                    this.isSubmitting = false;
                }
            });
        } else {
            this.posService.createProduct(productData).subscribe({
                next: () => {
                    this.finishSave();
                },
                error: (err) => {
                    console.error(err);
                    this.isSubmitting = false;
                }
            });
        }
    }

    onStockSubmit(): void {
        if (this.stockForm.invalid || !this.selectedProduct) return;

        // In a real app, we would have a dedicated 'adjustStock' endpoint.
        // Here we will simulate it by updating the product.
        const adjustment = Number(this.stockForm.value.adjustment);
        const newStock = (this.selectedProduct.stockQuantity || 0) + adjustment;

        if (newStock < 0) {
            alert('Cannot reduce stock below zero.');
            return;
        }

        const updateData = { stockQuantity: newStock };
        this.isSubmitting = true;

        this.posService.updateProduct(this.selectedProduct._id!, updateData).subscribe({
            next: () => {
                this.loadProducts();
                this.closeModals();
                this.isSubmitting = false;
            },
            error: (err) => {
                console.error(err);
                this.isSubmitting = false;
            }
        });
    }

    finishSave() {
        this.loadProducts();
        this.closeModals();
        this.isSubmitting = false;
    }

    toggleProductStatus(product: ExtendedProduct) {
        // Mock toggle
        product.isActive = !product.isActive;
        // In real app, call API
    }
}
