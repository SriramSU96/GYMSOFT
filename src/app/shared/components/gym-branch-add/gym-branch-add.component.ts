import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Gym, GymBranch } from '../../../core/models/gym.model';
import * as GymActions from '../../../core/store/gyms/gym.actions';

@Component({
    selector: 'app-gym-branch-add',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './gym-branch-add.component.html'
})
export class GymBranchAddComponent {
    private fb = inject(FormBuilder);
    private store = inject(Store);

    @Input() parentGym!: Gym | GymBranch;
    @Output() close = new EventEmitter<void>();

    branchForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        address: ['', [Validators.required, Validators.minLength(3)]],
        isMain: [false]
    });

    onSubmit() {
        if (this.branchForm.valid && this.parentGym) {
            const gymId = (this.parentGym as any)._id || (this.parentGym as GymBranch).gymId;

            const branchData: Partial<GymBranch> = {
                ...this.branchForm.value,
                gymId,
                name: this.branchForm.value.name || '',
                address: this.branchForm.value.address || '',
                isMain: false
            };

            this.store.dispatch(GymActions.createBranch({
                branch: branchData
            }));

            this.close.emit();
        } else {
            Object.values(this.branchForm.controls).forEach(control => {
                control.markAsTouched();
            });
        }
    }

    cancel() {
        this.close.emit();
    }
}
