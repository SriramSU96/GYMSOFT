import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberDietAssignment } from '../models/member-diet-assignment.model';
import { DietPlan } from '../models/gym-extensions.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MemberDietAssignmentService {
    private apiUrl = `${environment.apiUrl}/diets`;

    constructor(private http: HttpClient) { }

    // Get all diet plan assignments (using diets endpoint with memberId populated)
    getAllAssignments(): Observable<MemberDietAssignment[]> {
        // Backend returns diet plans, we need to transform them to assignments
        return this.http.get<DietPlan[]>(this.apiUrl).pipe(
            map(dietPlans => this.transformDietPlansToAssignments(dietPlans))
        );
    }

    // Get assignments for a specific member
    getMemberAssignments(memberId: string): Observable<MemberDietAssignment[]> {
        let params = new HttpParams().set('memberId', memberId);
        return this.http.get<DietPlan[]>(this.apiUrl, { params }).pipe(
            map(dietPlans => this.transformDietPlansToAssignments(dietPlans))
        );
    }

    // Get a single assignment by ID (diet plan ID)
    getAssignment(id: string): Observable<MemberDietAssignment> {
        return this.http.get<DietPlan>(`${this.apiUrl}/${id}`).pipe(
            map(dietPlan => this.transformDietPlanToAssignment(dietPlan))
        );
    }

    // Assign a diet plan to a member (create diet plan with memberId)
    assignDietPlan(request: any): Observable<MemberDietAssignment> {
        return this.http.post<DietPlan>(this.apiUrl, request).pipe(
            map(dietPlan => this.transformDietPlanToAssignment(dietPlan))
        );
    }

    // Update an assignment (update diet plan)
    updateAssignment(id: string, data: Partial<MemberDietAssignment>): Observable<MemberDietAssignment> {
        return this.http.put<DietPlan>(`${this.apiUrl}/${id}`, data).pipe(
            map(dietPlan => this.transformDietPlanToAssignment(dietPlan))
        );
    }

    // Delete an assignment (delete diet plan)
    deleteAssignment(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Get active assignments (filter by status on frontend)
    getActiveAssignments(): Observable<MemberDietAssignment[]> {
        return this.getAllAssignments().pipe(
            map(assignments => assignments.filter(a => a.status === 'Active'))
        );
    }

    // Get expired assignments
    getExpiredAssignments(): Observable<MemberDietAssignment[]> {
        return this.getAllAssignments().pipe(
            map(assignments => assignments.filter(a => a.status === 'Expired'))
        );
    }

    // Transform diet plan to assignment format
    private transformDietPlanToAssignment(dietPlan: DietPlan): MemberDietAssignment {
        return {
            _id: dietPlan._id,
            memberId: dietPlan.memberId || '',
            member: dietPlan.memberId ? {
                _id: dietPlan.memberId,
                memberId: dietPlan.memberId,
                name: 'Member', // Will be populated from backend if available
                phone: '',
                email: '',
                gender: 'Male',
                age: 0,
                membershipStatus: 'Active',
                gymId: dietPlan.gymId
            } : undefined,
            dietPlanId: dietPlan._id || '',
            dietPlan: dietPlan,
            startDate: new Date(),
            status: 'Active',
            gymId: dietPlan.gymId
        };
    }

    // Transform array of diet plans to assignments
    private transformDietPlansToAssignments(dietPlans: DietPlan[]): MemberDietAssignment[] {
        console.log('Transforming diet plans:', dietPlans);

        // Show all diet plans for now (remove memberId filter for debugging)
        const assignments = dietPlans.map(plan => this.transformDietPlanToAssignment(plan));

        console.log('Transformed to assignments:', assignments);
        return assignments;
    }
}
