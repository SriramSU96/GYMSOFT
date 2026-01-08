import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadMember, updateMember, deleteMember } from '../../../core/store/members/member.actions';
import { selectCurrentMember, selectMemberIsLoading } from '../../../core/store/members/member.selectors';
import { Observable, filter, take } from 'rxjs';
import { Member } from '../../../core/models/member.model';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css'
})
export class MemberDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);

  member$: Observable<Member | null> = this.store.select(selectCurrentMember);
  isLoading$ = this.store.select(selectMemberIsLoading);

  editForm: FormGroup;
  memberId: string = '';

  constructor() {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      membershipStatus: ['Active', Validators.required],
      membershipExpiry: ['']
    });
  }

  ngOnInit() {
    this.memberId = this.route.snapshot.paramMap.get('id') || '';
    if (this.memberId) {
      this.store.dispatch(loadMember({ id: this.memberId }));

      // Populate form when member data loads
      this.member$.pipe(
        filter(member => !!member),
        take(1)
      ).subscribe(member => {
        if (member) {
          this.editForm.patchValue({
            name: member.name,
            email: member.email,
            phone: member.phone,
            age: member.age,
            gender: member.gender,
            membershipStatus: member.membershipStatus,
            membershipExpiry: member.membershipExpiry
          });
        }
      });
    }
  }

  onSubmit() {
    if (this.editForm.valid && this.memberId) {
      const updates = this.editForm.value;
      this.store.dispatch(updateMember({
        id: this.memberId,
        changes: updates
      }));

      // Show success toast
      this.toastService.success('Member profile updated successfully!');

      // Navigate back after update
      setTimeout(() => {
        this.router.navigate(['/members']);
      }, 1000);
    }
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
      this.store.dispatch(deleteMember({ id: this.memberId }));
      this.toastService.success('Member deleted successfully!');
      this.router.navigate(['/members']);
    }
  }
}
