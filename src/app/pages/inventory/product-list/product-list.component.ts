
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosService } from '../../../core/services/pos.service';
import { AuthService } from '../../../core/services/auth.service';
import { Product } from '../../../core/models/gym-extensions.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductList implements OnInit {
    products: Product[] = [];
    productForm: FormGroup;
    isLoading = false;
    showModal = false;
    isEditing = false;
    currentId: string | null = null;

    categories = ['Supplement', 'Drink', 'Gear', 'Other'];

    constructor(
        private posService: PosService,
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.productForm = this.fb.group({
            name: ['', Validators.required],
            category: ['Supplement', Validators.required],
            price: [0, [Validators.required, Validators.min(0)]],
            stock: [0, [Validators.required, Validators.min(0)]]
        });
    }

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts(): void {
        const user = this.authService.getCurrentUser();
        if (!user || !user.gymId) return;

        this.isLoading = true;
        this.posService.getProducts().subscribe({
            next: (data) => {
                this.products = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }

    openModal(product?: Product): void {
        this.showModal = true;
        if (product) {
            this.isEditing = true;
            this.currentId = product._id!;
            this.productForm.patchValue(product);
        } else {
            this.isEditing = false;
            this.currentId = null;
            this.productForm.reset({ category: 'Supplement' });
        }
    }

    closeModal(): void {
        this.showModal = false;
    }

    onSubmit(): void {
        if (this.productForm.invalid) return;

        this.isLoading = true;
        const user = this.authService.getCurrentUser();
        const productData = {
            ...this.productForm.value,
            gymId: user?.gymId
        };

        if (this.isEditing && this.currentId) {
            this.posService.updateProduct(this.currentId, productData).subscribe({
                next: () => {
                    this.loadProducts();
                    this.closeModal();
                    this.isLoading = false;
                },
                error: (err) => {
                    console.error(err);
                    this.isLoading = false;
                }
            });
        } else {
            this.posService.createProduct(productData).subscribe({
                next: () => {
                    this.loadProducts();
                    this.closeModal();
                    this.isLoading = false;
                },
                error: (err) => {
                    console.error(err);
                    this.isLoading = false;
                }
            });
        }
    }
}
