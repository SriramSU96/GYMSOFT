import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { loadMembers } from '../../../core/store/members/member.actions';
import { selectMembers, selectMemberIsLoading } from '../../../core/store/members/member.selectors';
import { selectSelectedGym } from '../../../core/store/gyms/gym.selectors';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './member-list.html'
})
constructor() {
  this.store.select(selectSelectedGym)
    .pipe(
      takeUntilDestroyed(),
      filter(gym => !!gym)
    )
    .subscribe(gym => {
      const gymId = (gym as any).id;
      this.store.dispatch(loadMembers({ gymId }));
    });
}

ngOnInit() { }
}
