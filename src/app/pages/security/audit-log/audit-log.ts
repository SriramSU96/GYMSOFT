import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadLogs } from '../../../core/store/security/security.actions';
import { selectLogs } from '../../../core/store/security/security.selectors';

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-log.html'
})
export class AuditLog implements OnInit {
  store = inject(Store);
  logs$ = this.store.select(selectLogs);

  ngOnInit() {
    this.store.dispatch(loadLogs({}));
  }
}
