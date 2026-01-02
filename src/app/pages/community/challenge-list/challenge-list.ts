import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadChallenges } from '../../../core/store/community/community.actions';
import { selectChallenges } from '../../../core/store/community/community.selectors';

@Component({
  selector: 'app-challenge-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './challenge-list.html',
  styleUrl: './challenge-list.css'
})
export class ChallengeList implements OnInit {
  store = inject(Store);
  challenges$ = this.store.select(selectChallenges);

  ngOnInit() {
    this.store.dispatch(loadChallenges());
  }
}
