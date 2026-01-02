
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../core/store/auth/auth.actions';
import { selectIsLoading, selectError } from '../../../core/store/auth/auth.selectors';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    private store = inject(Store);
    private fb = inject(FormBuilder);

    registerForm: FormGroup;
    isLoading$ = this.store.select(selectIsLoading);
    error$ = this.store.select(selectError);

    constructor() {
        this.registerForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            role: ['member', Validators.required]
        });
    }

    onSubmit() {
        if (this.registerForm.valid) {
            const payload = {
                ...this.registerForm.value,
                gymId: '507f1f77bcf86cd799439011' // Valid ObjectId for verification
            };
            this.store.dispatch(AuthActions.register({ userData: payload }));
        }
    }
}
