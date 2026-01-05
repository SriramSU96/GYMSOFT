import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gym, GymBranch } from '../models/gym.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GymService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/gyms`;

    getGyms(): Observable<Gym[]> {
        return this.http.get<Gym[]>(`${this.apiUrl}/`);
    }

    getBranches(gymId: string): Observable<GymBranch[]> {
        return this.http.get<GymBranch[]>(`${this.apiUrl}/${gymId}/branches`);
    }

    createBranch(gymId: string, branchData: any): Observable<GymBranch> {
        // Aligned with backend guide: POST /api/gyms 
        // Guide shows: { "name": "Gym Name", "address": "Address" }
        return this.http.post<GymBranch>(`${this.apiUrl}`, {
            name: branchData.name,
            address: branchData.address
        });
    }
}
