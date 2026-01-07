
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

    getPost(id: string): Observable<Post> {
        return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
    }

    createPost(post: Post): Observable<Post> {
        return this.http.post<Post>(`${this.apiUrl}/posts`, post);
    }

    updatePost(id: string, post: Partial<Post>): Observable<Post> {
        return this.http.put<Post>(`${this.apiUrl}/posts/${id}`, post);
    }

    deletePost(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/posts/${id}`);
    }

    likePost(id: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/posts/${id}/like`, {});
    }

    commentPost(id: string, content: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/posts/${id}/comment`, { content });
    }

    getChallenges(): Observable<Challenge[]> {
        return this.http.get<Challenge[]>(`${this.apiUrl}/challenges`);
    }

    createChallenge(challenge: Challenge): Observable<Challenge> {
        return this.http.post<Challenge>(`${this.apiUrl}/challenges`, challenge);
    }

    joinChallenge(id: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/challenges/${id}/join`, {});
    }
}
