import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { registerMember } from '../../../core/store/members/member.actions';
import { selectMemberIsLoading } from '../../../core/store/members/member.selectors';
import { selectSelectedGym } from '../../../core/store/gyms/gym.selectors';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './member-add.html',
  styleUrl: './member-add.css'
})
export class MemberAdd implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);

  isLoading$ = this.store.select(selectMemberIsLoading);
  private gymSub?: Subscription;

  memberForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+]{10,15}$/)]],
    gender: ['male', Validators.required],
    dob: ['', Validators.required],
    membershipStatus: ['active', Validators.required],
    gymId: ['', Validators.required]
  });

  ngOnInit() {
    // Automatically set gymId from the global gym context
    this.gymSub = this.store.select(selectSelectedGym).subscribe(gym => {
      if (gym) {
        this.memberForm.patchValue({ gymId: gym.id });
        console.log('Gym context linked:', gym.name);
      } else {
        console.warn('No gym context found. Form may be disabled until a branch is selected.');
      }
    });
  }

  ngOnDestroy() {
    this.gymSub?.unsubscribe();
  }

  onSubmit() {
    if (this.memberForm.valid) {
      this.store.dispatch(registerMember({ member: this.memberForm.value as any }));
      // Optional: Navigation is often better handled by Effects to ensure success
      // But we can add a timeout or check store for success if needed
      this.router.navigate(['/members']);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.memberForm.controls).forEach(key => {
        const control = this.memberForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
