import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadMember } from '../../../core/store/members/member.actions';
import { selectCurrentMember, selectMemberIsLoading } from '../../../core/store/members/member.selectors';
import { Observable } from 'rxjs';
import { Member } from '../../../core/models/member.model';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css'
})
export class MemberDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  member$: Observable<Member | null> = this.store.select(selectCurrentMember);
  isLoading$ = this.store.select(selectMemberIsLoading);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(loadMember({ id }));
    }
  }
}
