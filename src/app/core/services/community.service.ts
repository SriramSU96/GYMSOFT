
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, Challenge } from '../models/community.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CommunityService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/community`;

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.apiUrl}/posts`);
    }

    createPost(post: Partial<Post>): Observable<Post> {
        return this.http.post<Post>(`${this.apiUrl}/posts`, post);
    }

    likePost(id: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/posts/${id}/like`, {});
    }

    commentPost(id: string, comment: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/posts/${id}/comment`, { comment });
    }

    getChallenges(): Observable<Challenge[]> {
        return this.http.get<Challenge[]>(`${this.apiUrl}/challenges`);
    }

    createChallenge(challenge: Partial<Challenge>): Observable<Challenge> {
        return this.http.post<Challenge>(`${this.apiUrl}/challenges`, challenge);
    }

    joinChallenge(id: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/challenges/${id}/join`, {});
    }
}
