import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadMembers } from '../../../core/store/members/member.actions';
import { selectMembers, selectMemberIsLoading } from '../../../core/store/members/member.selectors';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './member-list.html'
})
export class MemberList implements OnInit {
  store = inject(Store);
  members$ = this.store.select(selectMembers);
  isLoading$ = this.store.select(selectMemberIsLoading);

  ngOnInit() {
    this.store.dispatch(loadMembers());
  }
}
