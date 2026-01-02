import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html'
})
export class Header {
  store = inject(Store);
  currentUser$ = this.store.select(selectUser);
}
