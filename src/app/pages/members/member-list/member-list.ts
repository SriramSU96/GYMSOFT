import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { loadMembers, deleteMember } from '../../../core/store/members/member.actions';
import { selectMembers, selectMemberIsLoading } from '../../../core/store/members/member.selectors';
import { selectSelectedGym } from '../../../core/store/gyms/gym.selectors';
import { ToastService } from '../../../core/services/toast.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';
import { MemberInfoModalService } from '../../../core/services/member-info-modal.service';
import { Member } from '../../../core/models/member.model';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './member-list.html'
})
export class MemberList implements OnInit {
  store = inject(Store);
  private toastService = inject(ToastService);
  private confirmService = inject(ConfirmDialogService);
  private memberInfoService = inject(MemberInfoModalService);

  members$ = this.store.select(selectMembers);
  isLoading$ = this.store.select(selectMemberIsLoading);

  constructor() {
    this.store.dispatch(loadMembers());
  }

  ngOnInit() { }

  deleteMember(id: string) {
    if (!id) return;

    this.confirmService.confirm({
      title: 'Delete Member',
      message: 'Are you sure you want to delete this member? This action cannot be undone and will permanently remove all associated data.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger'
    }).pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(deleteMember({ id }));
        this.toastService.success('Member deleted successfully!');
      }
    });
  }

  showMemberInfo(member: Member) {
    this.memberInfoService.show(member);
  }
}
