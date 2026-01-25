
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PosService } from '../../../core/services/pos.service';
import { AuthService } from '../../../core/services/auth.service';
import { Product, Sale, SaleItem } from '../../../core/models/pos.model';

interface CartItem {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    stock: number;
}

@Component({
    selector: 'app-pos-terminal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, CurrencyPipe, DatePipe],
    templateUrl: './pos-terminal.component.html',
    styleUrls: ['./pos-terminal.component.css']
})
export class PosTerminal implements OnInit {
    // Data
    products: Product[] = [];
    filteredProducts: Product[] = [];
    cart: CartItem[] = [];

    // UI State
    categories: string[] = ['All', 'Supplement', 'Drink', 'Gear', 'Other'];
    selectedCategory: string = 'All';
    searchQuery: string = '';

    // Receipt Modal
    showReceipt: boolean = false;
    currentSale: Sale | null = null;

    // Form & Calculation
    saleForm: FormGroup;
    isLoading = false;

    // Financials
    subTotal = 0;
    discount = 0;
    taxRate = 0; // 0% default, can be 0.1 for 10%
    taxAmount = 0;
    grandTotal = 0;

    // Payment Methods
    paymentMethods = [
        { id: 'Cash', icon: 'payments', label: 'Cash' },
        { id: 'Card', icon: 'credit_card', label: 'Card' },
        { id: 'Online', icon: 'qr_code_scanner', label: 'UPI/Online' },
        { id: 'Other', icon: 'more_horiz', label: 'Other' }
    ];

    today = new Date();

    constructor(
        private posService: PosService,
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.saleForm = this.fb.group({
            paymentMethod: ['Cash', Validators.required],
            customerName: ['Walk-in Customer'],
            notes: [''],
            discount: [0, [Validators.min(0)]]
        });
    }

    ngOnInit(): void {
        this.loadProducts();

        // Listen to discount changes
        this.saleForm.get('discount')?.valueChanges.subscribe(val => {
            this.discount = val || 0;
            this.calculateTotals();
        });
    }

    loadProducts(): void {
        this.isLoading = true;
        this.posService.getProducts().subscribe({
            next: (data: any) => {
                this.products = data.data;
                this.applyFilters();
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }

    // --- Search & Filter ---

    setCategory(cat: string) {
        this.selectedCategory = cat;
        this.applyFilters();
    }

    applyFilters() {
        this.filteredProducts = this.products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(this.searchQuery.toLowerCase());
            const matchesCategory = this.selectedCategory === 'All' || p.category === this.selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }

    // --- Cart Actions ---

    addToCart(product: Product): void {
        if (product.stock <= 0) return;

        const existingItem = this.cart.find(item => item.productId === product._id);

        if (existingItem) {
            // Check stock limit
            if (existingItem.quantity < product.stock) {
                existingItem.quantity++;
            } else {
                // Shake animation trigger could go here
                alert('Max stock reached for this item');
                return;
            }
        } else {
            this.cart.push({
                productId: product._id!,
                productName: product.name,
                price: product.price,
                quantity: 1,
                stock: product.stock
            });
        }
        this.calculateTotals();
    }

    updateQuantity(productId: string, change: number): void {
        const item = this.cart.find(i => i.productId === productId);
        if (!item) return;

        const newQty = item.quantity + change;

        if (newQty <= 0) {
            this.removeFromCart(productId);
            return;
        }

        if (newQty <= item.stock) {
            item.quantity = newQty;
        } else {
            alert('Cannot add more than available stock');
        }

        this.calculateTotals();
    }

    removeFromCart(productId: string): void {
        this.cart = this.cart.filter(item => item.productId !== productId);
        this.calculateTotals();
    }

    clearCart() {
        if (confirm('Clear entire cart?')) {
            this.cart = [];
            this.calculateTotals();
        }
    }

    calculateTotals(): void {
        this.subTotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Tax (if applicable) logic
        this.taxAmount = this.subTotal * this.taxRate;

        // Grand Total
        const totalAfterDiscount = Math.max(0, this.subTotal - this.discount);
        this.grandTotal = totalAfterDiscount + this.taxAmount;
    }

    setPaymentMethod(method: string) {
        this.saleForm.patchValue({ paymentMethod: method });
    }

    // --- Checkout ---

    processSale(): void {
        if (this.cart.length === 0) return;

        this.isLoading = true;
        const user = this.authService.currentUserValue;

        // Map to Sale model
        const saleItems: SaleItem[] = this.cart.map(item => ({
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            unitPrice: item.price,
            total: item.price * item.quantity
        }));

        const saleData: Sale = {
            items: saleItems,
            subTotal: this.subTotal,
            discount: this.discount,
            tax: this.taxAmount,
            total: this.grandTotal,
            paymentMethod: this.saleForm.get('paymentMethod')?.value,
            status: 'Completed',
            soldBy: user?._id || 'SYS',
            gymId: user?.gymId || 'DEFAULT',
            date: new Date()
        };

        this.posService.createSale(saleData).subscribe({
            next: (res: any) => {
                this.currentSale = { ...saleData, _id: res.data?._id || 'REC-' + Date.now() }; // Ensure ID for receipt
                this.showReceipt = true;

                // Reset State
                this.cart = [];
                this.calculateTotals();
                this.saleForm.reset({
                    paymentMethod: 'Cash',
                    customerName: 'Walk-in Customer',
                    discount: 0
                });

                // Refresh products to show updated stock
                this.loadProducts();
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Sale failed', err);
                alert('Transaction Failed. Please try again.');
                this.isLoading = false;
            }
        });
    }

    closeReceipt() {
        this.showReceipt = false;
        this.currentSale = null;
    }

    printReceipt() {
        window.print();
    }
}
