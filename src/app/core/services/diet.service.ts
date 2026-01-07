
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DietPlan } from '../models/gym-extensions.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DietService {
    private apiUrl = `${environment.apiUrl}/diets`;

    constructor(private http: HttpClient) { }

    // Get all diet plans
    getDietPlans(): Observable<DietPlan[]> {
        return this.http.get<DietPlan[]>(this.apiUrl);
    }

    // Get a single diet plan by ID
    getDietPlan(id: string): Observable<DietPlan> {
        return this.http.get<DietPlan>(`${this.apiUrl}/${id}`);
    }

    // Create a new diet plan
    createDietPlan(dietPlan: DietPlan): Observable<DietPlan> {
        return this.http.post<DietPlan>(this.apiUrl, dietPlan);
    }

    // Update an existing diet plan
    updateDietPlan(id: string, dietPlan: Partial<DietPlan>): Observable<DietPlan> {
        return this.http.put<DietPlan>(`${this.apiUrl}/${id}`, dietPlan);
    }

    // Delete a diet plan
    deleteDietPlan(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Get member's assigned diet plan
    getMemberDiet(memberId: string): Observable<DietPlan> {
        return this.http.get<DietPlan>(`${environment.apiUrl}/members/${memberId}/diet`);
    }
}
