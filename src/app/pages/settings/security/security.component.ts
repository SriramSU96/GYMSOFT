
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-security',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './security.component.html',
    styleUrls: ['./security.component.css']
})
export class SecurityComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);

    passwordForm: FormGroup = this.fb.group({
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    isSubmitting = false;
    message = '';
    messageType: 'success' | 'error' = 'success';

    passwordMatchValidator(g: FormGroup) {
        return g.get('newPassword')?.value === g.get('confirmPassword')?.value
            ? null : { mismatch: true };
    }

    onSubmit() {
        if (this.passwordForm.invalid) return;

        this.isSubmitting = true;
        this.message = '';

        const { currentPassword, newPassword } = this.passwordForm.value;

        this.authService.changePassword({ currentPassword, newPassword }).subscribe({
            next: () => {
                this.message = 'Password updated successfully';
                this.messageType = 'success';
                this.isSubmitting = false;
                this.passwordForm.reset();
            },
            error: (err) => {
                this.message = err.error?.message || 'Failed to update password';
                this.messageType = 'error';
                this.isSubmitting = false;
            }
        });
    }
}
