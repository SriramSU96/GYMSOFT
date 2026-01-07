
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Member, MemberProgress, Achievement } from '../models/member.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MemberService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/members`;

    registerMember(member: Member): Observable<Member> {
        return this.http.post<Member>(`${this.apiUrl}`, member);
    }

    getMember(id: string): Observable<Member> {
        return this.http.get<Member>(`${this.apiUrl}/${id}`);
    }

    getMembers(keyword?: string, pageNumber: number = 1): Observable<Member[]> {
        let params = new HttpParams();
        if (keyword) params = params.set('keyword', keyword);
        params = params.set('pageNumber', pageNumber);

        // Spec says GET /api/members (Search/Pagination)
        // Backend filters by gymId automatically from token.
        return this.http.get<{ members: Member[], total: number }>(`${this.apiUrl}`, { params }).pipe(
            map(response => response.members)
        );
    }

    updateMember(id: string, changes: Partial<Member>): Observable<Member> {
        return this.http.put<Member>(`${this.apiUrl}/${id}`, changes);
    }

    addProgress(record: MemberProgress): Observable<MemberProgress> {
        return this.http.post<MemberProgress>(`${this.apiUrl}/progress`, record);
    }

    getProgress(memberId: string): Observable<MemberProgress[]> {
        return this.http.get<MemberProgress[]>(`${this.apiUrl}/progress/${memberId}`);
    }

    assignAchievement(achievement: Achievement): Observable<Achievement> {
        return this.http.post<Achievement>(`${this.apiUrl}/achievements`, achievement);
    }

    getAchievements(memberId: string): Observable<Achievement[]> {
        return this.http.get<Achievement[]>(`${this.apiUrl}/achievements/${memberId}`);
    }

    getMemberWorkout(memberId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${memberId}/workout`);
    }

    getMemberDiet(memberId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${memberId}/diet`);
    }

    getMemberBookings(memberId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${memberId}/bookings`);
    }

    deleteMember(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
