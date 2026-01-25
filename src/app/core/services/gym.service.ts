import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gym, GymBranch, GymConfig } from '../models/gym.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GymService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/gyms`;

    // Gym Management
    getCurrentGym(): Observable<{ success: boolean; data: Gym }> {
        return this.http.get<{ success: boolean; data: Gym }>(`${this.apiUrl}/current`);
    }

    updateGym(data: Partial<Gym>): Observable<{ success: boolean; data: Gym }> {
        return this.http.patch<{ success: boolean; data: Gym }>(`${this.apiUrl}/current`, data);
    }

    updateSettings(config: Partial<GymConfig>): Observable<{ success: boolean; data: Gym }> {
        return this.http.patch<{ success: boolean; data: Gym }>(`${this.apiUrl}/settings`, config);
    }

    // Branch Management
    getBranches(): Observable<{ success: boolean; data: GymBranch[] }> {
        return this.http.get<{ success: boolean; data: GymBranch[] }>(`${this.apiUrl}/branches`);
    }

    createBranch(branch: Partial<GymBranch>): Observable<{ success: boolean; data: GymBranch }> {
        return this.http.post<{ success: boolean; data: GymBranch }>(`${this.apiUrl}/branches`, branch);
    }

    updateBranch(branchId: string, branch: Partial<GymBranch>): Observable<{ success: boolean; data: GymBranch }> {
        return this.http.put<{ success: boolean; data: GymBranch }>(`${this.apiUrl}/branches/${branchId}`, branch);
    }

    deleteBranch(branchId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/branches/${branchId}`);
    }
}
