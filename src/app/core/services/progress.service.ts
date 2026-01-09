import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgressRecord, MemberProgressSummary, CreateProgressRequest } from '../models/progress.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProgressService {
    private apiUrl = `${environment.apiUrl}/members`;

    constructor(private http: HttpClient) { }

    // Get progress history for a specific member
    getMemberProgress(memberId: string): Observable<ProgressRecord[]> {
        return this.http.get<ProgressRecord[]>(`${this.apiUrl}/progress/${memberId}`);
    }

    // Get all progress records (not directly supported by backend, use member-specific)
    getAllProgress(gymId?: string, memberId?: string): Observable<ProgressRecord[]> {
        // Backend doesn't have a "get all" endpoint, so we'll need a member ID
        // For now, return empty array or implement differently
        if (memberId) {
            return this.getMemberProgress(memberId);
        }
        // Return empty observable if no member ID
        return new Observable(observer => {
            observer.next([]);
            observer.complete();
        });
    }

    // Get member progress summary (calculate from progress history)
    getMemberProgressSummary(memberId: string): Observable<MemberProgressSummary> {
        // Backend doesn't have summary endpoint, we'll calculate it from progress history
        return new Observable(observer => {
            this.getMemberProgress(memberId).subscribe({
                next: (records) => {
                    if (records.length > 0) {
                        const latest = records[0]; // Backend returns sorted by date (newest first)
                        const oldest = records[records.length - 1];

                        const summary: MemberProgressSummary = {
                            memberId: memberId,
                            memberName: 'Member', // Will need to fetch from member endpoint
                            phone: '',
                            age: 0,
                            fitnessGoal: 'Fitness',
                            currentWeight: latest.weight,
                            currentBMI: latest.bmi || 0,
                            progressStatus: this.calculateStatus(latest.weight, oldest.weight),
                            totalRecords: records.length,
                            latestRecord: latest,
                            firstRecord: oldest,
                            weightChange: latest.weight - oldest.weight,
                            bmiChange: (latest.bmi || 0) - (oldest.bmi || 0)
                        };

                        observer.next(summary);
                        observer.complete();
                    } else {
                        observer.error('No progress records found');
                    }
                },
                error: (err) => observer.error(err)
            });
        });
    }

    // Calculate progress status
    private calculateStatus(currentWeight: number, startWeight: number): 'Improving' | 'Stable' | 'Needs Attention' {
        const change = currentWeight - startWeight;
        if (change < -2) return 'Improving';
        if (change > 2) return 'Needs Attention';
        return 'Stable';
    }

    // Get a single progress record (not directly supported, get from history)
    getProgressRecord(id: string): Observable<ProgressRecord> {
        // Backend doesn't have this endpoint
        return new Observable(observer => {
            observer.error('Not implemented - use getMemberProgress instead');
        });
    }

    // Create a new progress record
    createProgress(request: CreateProgressRequest): Observable<ProgressRecord> {
        return this.http.post<ProgressRecord>(`${this.apiUrl}/progress`, request);
    }

    // Update a progress record
    updateProgress(id: string, data: Partial<ProgressRecord>): Observable<ProgressRecord> {
        return this.http.put<ProgressRecord>(`${this.apiUrl}/progress/${id}`, data);
    }

    // Delete a progress record
    deleteProgress(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/progress/${id}`);
    }

    // Get progress records within a date range (filter on frontend)
    getProgressByDateRange(memberId: string, startDate: Date, endDate: Date): Observable<ProgressRecord[]> {
        return new Observable(observer => {
            this.getMemberProgress(memberId).subscribe({
                next: (records) => {
                    const filtered = records.filter(r => {
                        const recordDate = new Date(r.recordedDate);
                        return recordDate >= startDate && recordDate <= endDate;
                    });
                    observer.next(filtered);
                    observer.complete();
                },
                error: (err) => observer.error(err)
            });
        });
    }

    // Get active assignments (not applicable for progress)
    getActiveAssignments(): Observable<ProgressRecord[]> {
        return new Observable(observer => {
            observer.next([]);
            observer.complete();
        });
    }

    // Get expired assignments (not applicable for progress)
    getExpiredAssignments(): Observable<ProgressRecord[]> {
        return new Observable(observer => {
            observer.next([]);
            observer.complete();
        });
    }
}
