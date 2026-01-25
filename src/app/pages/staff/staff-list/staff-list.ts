import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadStaff } from '../../../core/store/staff/staff.actions';
import { selectAllStaff, selectStaffLoading } from '../../../core/store/staff/staff.selectors';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './staff-list.html'
})
export class StaffList implements OnInit {
  store = inject(Store);
  staff$ = this.store.select(selectAllStaff);
  isLoading$ = this.store.select(selectStaffLoading);

  ngOnInit() {
    this.store.dispatch(loadStaff({}));
  }
}
