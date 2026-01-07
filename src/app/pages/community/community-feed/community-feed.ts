import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as CommunityActions from '../../../core/store/community/community.actions';
import { selectPosts, selectChallenges } from '../../../core/store/community/community.selectors';

@Component({
  selector: 'app-community-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community-feed.html',
  styleUrl: './community-feed.css'
})
export class CommunityFeed implements OnInit {
  private store = inject(Store);
  posts$ = this.store.select(selectPosts);
  challenges$ = this.store.select(selectChallenges);

  ngOnInit() {
    this.store.dispatch(CommunityActions.loadPosts());
    this.store.dispatch(CommunityActions.loadChallenges());
  }

  likePost(postId: string) {
    this.store.dispatch(CommunityActions.likePost({ postId }));
  }
}
