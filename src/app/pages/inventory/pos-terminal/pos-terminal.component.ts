
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { PosService } from '../../../core/services/pos.service';
import { AuthService } from '../../../core/services/auth.service';
import { Product, Sale, SaleItem } from '../../../core/models/gym-extensions.model';

@Component({
    selector: 'app-pos-terminal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './pos-terminal.component.html',
    styleUrls: ['./pos-terminal.component.css']
})
export class PosTerminal implements OnInit {
    products: Product[] = [];
    cart: SaleItem[] = [];
    saleForm: FormGroup;
    isLoading = false;
    successMessage = '';
    totalAmount = 0;

    constructor(
        private posService: PosService,
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.saleForm = this.fb.group({
            paymentMethod: ['Cash', Validators.required],
            customerName: ['Walk-in Customer'],
            notes: ['']
        });
    }

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts(): void {
        const user = this.authService.getCurrentUser();
        if (user?.gymId) {
            this.posService.getProducts(user.gymId).subscribe(data => {
                this.products = data;
            });
        }
    }

    addToCart(product: Product): void {
        const existingItem = this.cart.find(item => item.productId === product._id);
        if (existingItem) {
            if (existingItem.quantity < product.stock) {
                existingItem.quantity++;
            }
        } else {
            this.cart.push({
                productId: product._id!,
                productName: product.name,
                price: product.price,
                quantity: 1
            });
        }
        this.calculateTotal();
    }

    removeFromCart(productId: string): void {
        this.cart = this.cart.filter(item => item.productId !== productId);
        this.calculateTotal();
    }

    updateQuantity(productId: string, change: number): void {
        const item = this.cart.find(i => i.productId === productId);
        if (item) {
            const product = this.products.find(p => p._id === productId);
            if (!product) return;

            const newQty = item.quantity + change;
            if (newQty > 0 && newQty <= product.stock) {
                item.quantity = newQty;
            }
        }
        this.calculateTotal();
    }

    calculateTotal(): void {
        this.totalAmount = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    processSale(): void {
        if (this.cart.length === 0) return;

        this.isLoading = true;
        const user = this.authService.getCurrentUser();

        const saleData = {
            gymId: user?.gymId,
            items: this.cart,
            totalAmount: this.totalAmount,
            paymentMethod: this.saleForm.get('paymentMethod')?.value,
            customerName: this.saleForm.get('customerName')?.value,
            date: new Date().toISOString()
        };

        this.posService.processSale(saleData).subscribe({
            next: (res) => {
                this.successMessage = 'Sale processed successfully!';
                this.cart = [];
                this.totalAmount = 0;
                this.saleForm.reset({
                    paymentMethod: 'Cash',
                    customerName: 'Walk-in Customer'
                });
                this.loadProducts(); // Refresh stock
                this.isLoading = false;
                setTimeout(() => this.successMessage = '', 3000);
            },
            error: (err) => {
                console.error('Sale failed', err);
                this.isLoading = false;
            }
        });
    }
}
