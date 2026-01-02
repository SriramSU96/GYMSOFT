import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addStaff } from '../../../core/store/staff/staff.actions';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-staff-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './staff-add.html',
  styleUrl: './staff-add.css'
})
export class StaffAdd {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  staffForm = this.fb.group({
    name: ['', Validators.required],
    role: ['', Validators.required],
    phone: ['', Validators.required],
    salary: [0, [Validators.required, Validators.min(0)]],
    gymId: ['gym123', Validators.required]
  });

  onSubmit() {
    if (this.staffForm.valid) {
      this.store.dispatch(addStaff({ staff: this.staffForm.value as any }));
    }
  }
}
