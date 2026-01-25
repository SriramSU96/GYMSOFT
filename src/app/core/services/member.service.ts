import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Member, MemberResponse, MembersResponse, Achievement, MemberProgress } from '../models/member.model';

@Injectable({
    providedIn: 'root'
})
export class MemberService {
    private apiUrl = `${environment.apiUrl}/members`;

    constructor(private http: HttpClient) { }

    getMembers(params: any = {}): Observable<MembersResponse> {
        let httpParams = new HttpParams();
        Object.keys(params).forEach(key => {
            if (params[key]) {
                httpParams = httpParams.append(key, params[key]);
            }
        });
        // Default params if not provided
        if (!params.pageNumber) httpParams = httpParams.append('pageNumber', '1');
        if (!params.pageSize) httpParams = httpParams.append('pageSize', '10');

        return this.http.get<MembersResponse>(this.apiUrl, { params: httpParams });
    }

    getMemberById(id: string): Observable<MemberResponse> {
        return this.http.get<MemberResponse>(`${this.apiUrl}/${id}`);
    }

    createMember(memberData: Partial<Member>): Observable<MemberResponse> {
        return this.http.post<MemberResponse>(this.apiUrl, memberData);
    }

    updateMember(id: string, memberData: Partial<Member>): Observable<MemberResponse> {
        return this.http.put<MemberResponse>(`${this.apiUrl}/${id}`, memberData);
    }

    deleteMember(id: string): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`);
    }

    // QR Code Operations
    generateQr(id: string): Observable<{ success: boolean; qrToken: string; qrGeneratedAt: Date }> {
        return this.http.post<{ success: boolean; qrToken: string; qrGeneratedAt: Date }>(`${this.apiUrl}/${id}/qr-generate`, {});
    }

    refreshQr(id: string): Observable<{ success: boolean; qrToken: string; qrGeneratedAt: Date }> {
        return this.http.patch<{ success: boolean; qrToken: string; qrGeneratedAt: Date }>(`${this.apiUrl}/${id}/qr-refresh`, {});
    }

    // Related Data Fetching
    getMemberWorkoutPlan(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}/workout`);
    }

    getMemberDietPlan(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}/diet`);
    }

    getMemberAttendance(id: string, startDate?: string, endDate?: string): Observable<any> {
        let params = new HttpParams();
        if (startDate) params = params.append('startDate', startDate);
        if (endDate) params = params.append('endDate', endDate);
        return this.http.get<any>(`${this.apiUrl}/${id}/attendance`, { params });
    }

    // Achievements
    addAchievement(achievement: Partial<Achievement>): Observable<{ success: boolean; achievement: Achievement }> {
        return this.http.post<{ success: boolean; achievement: Achievement }>(`${this.apiUrl}/achievements`, achievement);
    }

    getAchievements(memberId: string): Observable<{ success: boolean; achievements: Achievement[] }> {
        return this.http.get<{ success: boolean; achievements: Achievement[] }>(`${this.apiUrl}/achievements/${memberId}`);
    }

    // Progress
    addProgress(record: Partial<MemberProgress>): Observable<{ success: boolean; progress: MemberProgress }> {
        return this.http.post<{ success: boolean; progress: MemberProgress }>(`${this.apiUrl}/progress`, record);
    }

    getProgress(memberId: string): Observable<{ success: boolean; progress: MemberProgress[] }> {
        return this.http.get<{ success: boolean; progress: MemberProgress[] }>(`${this.apiUrl}/progress/${memberId}`);
    }
}
