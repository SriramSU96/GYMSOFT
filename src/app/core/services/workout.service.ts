
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout, AssignedPlan } from '../models/gym-extensions.model'; // Adjust path if needed
import { environment } from '../../../environments/environment'; // Assuming environment file exists

@Injectable({
    providedIn: 'root'
})
export class WorkoutService {
    private apiUrl = `${environment.apiUrl}/workouts`;
    private plansUrl = `${environment.apiUrl}/plans`;

    constructor(private http: HttpClient) { }

    // Get all workouts
    getWorkouts(): Observable<Workout[]> {
        return this.http.get<Workout[]>(this.apiUrl);
    }

    // Get a single workout by ID
    getWorkout(id: string): Observable<Workout> {
        return this.http.get<Workout>(`${this.apiUrl}/${id}`);
    }

    // Create a new workout
    createWorkout(workout: Workout): Observable<Workout> {
        return this.http.post<Workout>(this.apiUrl, workout);
    }

    // Update an existing workout
    updateWorkout(id: string, workout: Partial<Workout>): Observable<Workout> {
        return this.http.put<Workout>(`${this.apiUrl}/${id}`, workout);
    }

    // Delete a workout
    deleteWorkout(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Assign a plan (Workout + Diet) to a member
    assignPlan(assignment: any): Observable<AssignedPlan> {
        return this.http.post<AssignedPlan>(`${this.plansUrl}/assign`, assignment);
    }

    // Get member's assigned workout
    getMemberWorkout(memberId: string): Observable<Workout> {
        return this.http.get<Workout>(`${environment.apiUrl}/members/${memberId}/workout`);
    }
}
