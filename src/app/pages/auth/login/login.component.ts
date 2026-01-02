
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../core/store/auth/auth.actions';
import { selectIsLoading, selectError } from '../../../core/store/auth/auth.selectors';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    private store = inject(Store);
    private fb = inject(FormBuilder);

    loginForm: FormGroup;
    isLoading$ = this.store.select(selectIsLoading);
    error$ = this.store.select(selectError);

    constructor() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.store.dispatch(AuthActions.login({ credentials: this.loginForm.value }));
        }
    }
}
