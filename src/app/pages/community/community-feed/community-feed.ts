import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadPosts, loadChallenges } from '../../../core/store/community/community.actions';
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
    this.store.dispatch(loadPosts());
    this.store.dispatch(loadChallenges());
  }

  likePost(postId: string) {
    // In a real app, we'd dispatch a likePost action
    console.log('Liking post:', postId);
  }
}
