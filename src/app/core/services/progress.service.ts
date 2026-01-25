import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MemberProgress, ProgressResponse, ProgressHistoryResponse } from '../models/progress.model';

@Injectable({
    providedIn: 'root'
})
export class ProgressService {
    private apiUrl = `${environment.apiUrl}/members/progress`;

    constructor(private http: HttpClient) { }

    addProgress(progressData: Partial<MemberProgress>): Observable<ProgressResponse> {
        return this.http.post<ProgressResponse>(this.apiUrl, progressData);
    }

    getProgressHistory(memberId: string): Observable<ProgressHistoryResponse> {
        return this.http.get<ProgressHistoryResponse>(`${this.apiUrl}/${memberId}`);
    }

    getMemberProgressSummary(memberId: string): Observable<{ success: boolean; summary: any }> {
        return this.http.get<{ success: boolean; summary: any }>(`${this.apiUrl}/${memberId}/summary`);
    }

    updateProgress(id: string, progressData: Partial<MemberProgress>): Observable<ProgressResponse> {
        return this.http.put<ProgressResponse>(`${this.apiUrl}/${id}`, progressData);
    }

    deleteProgress(id: string): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`);
    }
}
