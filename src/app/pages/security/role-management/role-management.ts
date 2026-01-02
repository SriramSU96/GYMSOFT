import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadRoles } from '../../../core/store/security/security.actions';
import { selectRoles } from '../../../core/store/security/security.selectors';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-management.html'
})
export class RoleManagement implements OnInit {
  private store = inject(Store);
  roles$ = this.store.select(selectRoles);

  ngOnInit() {
    this.store.dispatch(loadRoles());
  }
}
