
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

    // Get all workouts (optionally filter by gymId)
    getWorkouts(gymId?: string): Observable<Workout[]> {
        let params = new HttpParams();
        if (gymId) {
            params = params.set('gymId', gymId);
        }
        return this.http.get<Workout[]>(this.apiUrl, { params });
    }

    // Get a single workout by ID
    getWorkoutById(id: string): Observable<Workout> {
        return this.http.get<Workout>(`${this.apiUrl}/${id}`);
    }

    // Create a new workout
    createWorkout(workout: Partial<Workout>): Observable<Workout> {
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

    // Get assigned workout for a specific member
    getMemberWorkout(memberId: string): Observable<Workout> {
        return this.http.get<Workout>(`${environment.apiUrl}/members/${memberId}/workout`);
    }
}
