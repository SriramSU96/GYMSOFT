import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
    WorkoutPlan, WorkoutPlanResponse, WorkoutPlansResponse,
    WorkoutDay, WorkoutExercise, AssignedWorkoutPlan, WorkoutCompletion
} from '../models/workout-plan.model';

@Injectable({
    providedIn: 'root'
})
export class WorkoutPlanService {
    private apiUrl = `${environment.apiUrl}/workout-plans`;

    constructor(private http: HttpClient) { }

    // Plan CRUD
    getPlans(params: any = {}): Observable<WorkoutPlansResponse> {
        let httpParams = new HttpParams();
        Object.keys(params).forEach(key => {
            if (params[key] !== undefined && params[key] !== null) {
                httpParams = httpParams.append(key, params[key]);
            }
        });
        return this.http.get<WorkoutPlansResponse>(this.apiUrl, { params: httpParams });
    }

    getPlanById(id: string): Observable<any> { // Returns plan + days + exercises
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    createPlan(plan: Partial<WorkoutPlan>): Observable<WorkoutPlanResponse> {
        return this.http.post<WorkoutPlanResponse>(this.apiUrl, plan);
    }

    deletePlan(id: string): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`);
    }

    // Days & Exercises
    addDays(planId: string, daysStructure: any): Observable<{ success: boolean; days: WorkoutDay[] }> {
        return this.http.post<{ success: boolean; days: WorkoutDay[] }>(`${this.apiUrl}/${planId}/days`, daysStructure);
    }

    addExercises(dayId: string, exercises: any[]): Observable<{ success: boolean; exercises: WorkoutExercise[] }> {
        return this.http.post<{ success: boolean; exercises: WorkoutExercise[] }>(`${this.apiUrl}/days/${dayId}/exercises`, { exercises });
    }

    // Assignment & Completion
    assignPlan(assignment: { memberId: string; workoutPlanId: string; startDate: Date; endDate?: Date }): Observable<{ success: boolean; assignment: AssignedWorkoutPlan }> {
        return this.http.post<{ success: boolean; assignment: AssignedWorkoutPlan }>(`${this.apiUrl}/assign`, assignment);
    }

    getMemberPlan(memberId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/members/${memberId}`);
    }

    logCompletion(completion: Partial<WorkoutCompletion>): Observable<{ success: boolean; completion: WorkoutCompletion }> {
        return this.http.post<{ success: boolean; completion: WorkoutCompletion }>(`${this.apiUrl}/completion`, completion);
    }
}
