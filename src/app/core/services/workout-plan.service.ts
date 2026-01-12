import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    WorkoutPlan,
    WorkoutDay,
    WorkoutExercise,
    AssignedWorkoutPlan,
    WorkoutCompletion,
    WorkoutPlanStructure,
    CreateWorkoutPlanDto,
    AddDaysDto,
    AddExercisesDto,
    AssignPlanDto,
    TrackCompletionDto,
    WorkoutPlanFilters,
    WorkoutPlanListResponse,
    MemberWorkoutResponse
} from '../models/workout-plan.model';

@Injectable({
    providedIn: 'root'
})
export class WorkoutPlanService {
    private http = inject(HttpClient);
    private apiUrl = '/api/v1/workout-plans';

    // ========================================
    // A. Management (Admin/Trainer/Manager)
    // ========================================

    /**
     * Create Plan Metadata
     * POST /api/v1/workout-plans
     */
    createPlan(dto: CreateWorkoutPlanDto): Observable<WorkoutPlan> {
        return this.http.post<WorkoutPlan>(this.apiUrl, dto);
    }

    /**
     * Add Days to Plan
     * POST /api/v1/workout-plans/:id/days
     */
    addDaysToPlan(planId: string, dto: AddDaysDto): Observable<WorkoutDay[]> {
        return this.http.post<WorkoutDay[]>(`${this.apiUrl}/${planId}/days`, dto);
    }

    /**
     * Add Exercises to Day
     * POST /api/v1/workout-plans/days/:dayId/exercises
     */
    addExercisesToDay(dayId: string, dto: AddExercisesDto): Observable<WorkoutExercise[]> {
        const url = `${this.apiUrl}/days/${dayId}/exercises`;
        console.log('📡 SERVICE: Making HTTP POST request');
        console.log('URL:', url);
        console.log('Payload:', dto);
        return this.http.post<WorkoutExercise[]>(url, dto);
    }

    /**
     * Assign to Member
     * POST /api/v1/workout-plans/assign
     */
    assignPlanToMember(dto: AssignPlanDto): Observable<AssignedWorkoutPlan> {
        return this.http.post<AssignedWorkoutPlan>(`${this.apiUrl}/assign`, dto);
    }

    /**
     * Update Plan Metadata
     * PUT /api/v1/workout-plans/:id
     */
    updatePlan(planId: string, dto: Partial<CreateWorkoutPlanDto>): Observable<WorkoutPlan> {
        return this.http.put<WorkoutPlan>(`${this.apiUrl}/${planId}`, dto);
    }

    /**
     * Delete Plan
     * DELETE /api/v1/workout-plans/:id
     */
    deletePlan(planId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${planId}`);
    }

    // ========================================
    // B. Retrieval (Public/Protected)
    // ========================================

    /**
     * Get All Plans (with filters)
     * GET /api/v1/workout-plans?level=Advanced&goal=Muscle Gain
     */
    getPlans(filters?: WorkoutPlanFilters, page: number = 1, pageSize: number = 20): Observable<WorkoutPlanListResponse> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('pageSize', pageSize.toString());

        if (filters) {
            if (filters.level) params = params.set('level', filters.level);
            if (filters.goal) params = params.set('goal', filters.goal);
            if (filters.isActive !== undefined) params = params.set('isActive', filters.isActive.toString());
            if (filters.search) params = params.set('search', filters.search);
        }

        // Backend returns array directly, need to transform to expected format
        return this.http.get<any>(this.apiUrl, { params }).pipe(
            map((response: any) => {
                console.log('🔄 SERVICE: Transforming response');
                console.log('Raw response type:', Array.isArray(response) ? 'array' : 'object');

                // If backend returns an array, transform it
                if (Array.isArray(response)) {
                    const transformed: WorkoutPlanListResponse = {
                        plans: response,
                        total: response.length,
                        page: page,
                        pages: Math.ceil(response.length / pageSize)
                    };
                    console.log('✅ Transformed to:', transformed);
                    return transformed;
                }

                // If backend already returns correct format, use it
                console.log('✅ Using response as-is');
                return response as WorkoutPlanListResponse;
            })
        );
    }

    /**
     * Get FULL Plan Structure (Nested)
     * GET /api/v1/workout-plans/:id
     * Returns the entire tree with days and exercises
     */
    getPlanStructure(planId: string): Observable<WorkoutPlanStructure> {
        return this.http.get<WorkoutPlanStructure>(`${this.apiUrl}/${planId}`);
    }

    /**
     * Get Member's Active Plan
     * GET /api/v1/workout-plans/members/:memberId
     */
    getMemberWorkout(memberId: string): Observable<MemberWorkoutResponse> {
        return this.http.get<MemberWorkoutResponse>(`${this.apiUrl}/members/${memberId}`);
    }

    // ========================================
    // C. Progress Tracking
    // ========================================

    /**
     * Track Exercise Completion
     * POST /api/v1/workout-plans/completion
     */
    trackCompletion(dto: TrackCompletionDto): Observable<WorkoutCompletion> {
        return this.http.post<WorkoutCompletion>(`${this.apiUrl}/completion`, dto);
    }

    /**
     * Get Member's Completion History
     * GET /api/v1/workout-plans/completion/:memberId
     */
    getMemberCompletions(memberId: string, planId?: string): Observable<WorkoutCompletion[]> {
        let params = new HttpParams();
        if (planId) params = params.set('planId', planId);

        return this.http.get<WorkoutCompletion[]>(`${this.apiUrl}/completion/${memberId}`, { params });
    }
}
