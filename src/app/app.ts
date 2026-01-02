import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUser } from './core/store/auth/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('GYMSOFT');
  private store = inject(Store);

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.store.dispatch(loadUser());
    }
  }
}
