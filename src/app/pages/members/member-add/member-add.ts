import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { registerMember } from '../../../core/store/members/member.actions';
import { selectMemberIsLoading } from '../../../core/store/members/member.selectors';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-member-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './member-add.html',
  styleUrl: './member-add.css'
})
export class MemberAdd {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  isLoading$ = this.store.select(selectMemberIsLoading);

  memberForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    gender: ['male', Validators.required],
    dob: ['', Validators.required],
    membershipStatus: ['active', Validators.required],
    gymId: ['gym123', Validators.required] // Hardcoded for now, should come from auth/gym context
  });

  onSubmit() {
    if (this.memberForm.valid) {
      this.store.dispatch(registerMember({ member: this.memberForm.value as any }));
      // Navigation should be handled by effect or manually:
      // this.router.navigate(['/members']); 
      // For now, assume effect or user manually goes back. Ideally add success banner.
    }
  }
}
