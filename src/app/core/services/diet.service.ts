
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DietPlan } from '../models/gym-extensions.model';
import { DietMeal, DietMealFilters, DietMealListResponse } from '../models/diet.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DietService {
    private apiUrl = `${environment.apiUrl}/diets`;
    private mealsUrl = `${environment.apiUrl}/diet-meals`;
    private uploadUrl = `${environment.apiUrl}/upload`;

    constructor(private http: HttpClient) { }

    // ==========================================
    // DIET MEAL LIBRARY (NEW)
    // ==========================================

    getMeals(filters: DietMealFilters): Observable<DietMealListResponse> {
        let params = new HttpParams()
            .set('page', filters.page.toString())
            .set('pageSize', filters.pageSize.toString());

        if (filters.category) params = params.set('category', filters.category);
        if (filters.foodType) params = params.set('foodType', filters.foodType);
        if (filters.search) params = params.set('search', filters.search);

        return this.http.get<DietMealListResponse>(this.mealsUrl, { params });
    }

    getMeal(id: string): Observable<DietMeal> {
        return this.http.get<DietMeal>(`${this.mealsUrl}/${id}`);
    }

    createMeal(meal: Partial<DietMeal>): Observable<DietMeal> {
        return this.http.post<DietMeal>(this.mealsUrl, meal);
    }

    updateMeal(id: string, meal: Partial<DietMeal>): Observable<DietMeal> {
        return this.http.put<DietMeal>(`${this.mealsUrl}/${id}`, meal);
    }

    deleteMeal(id: string): Observable<void> {
        return this.http.delete<void>(`${this.mealsUrl}/${id}`);
    }

    deactivateMeal(id: string): Observable<void> {
        return this.http.patch<void>(`${this.mealsUrl}/${id}/deactivate`, {});
    }

    uploadImage(file: File): Observable<{ success: boolean; message: string; imageUrl: string }> {
        const formData = new FormData();
        formData.append('image', file);
        return this.http.post<{ success: boolean; message: string; imageUrl: string }>(this.uploadUrl, formData);
    }

    // ==========================================
    // DIET PLANS (EXISTING)
    // ==========================================

    // Get all diet plans with optional filtering
    getDietPlans(gymId?: string, memberId?: string): Observable<DietPlan[]> {
        let params = new HttpParams();

        if (gymId) {
            params = params.set('gymId', gymId);
        }

        if (memberId) {
            params = params.set('memberId', memberId);
        }

        return this.http.get<DietPlan[]>(this.apiUrl, { params });
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
    getMemberDiet(memberId: string): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/members/${memberId}/diet-plan`);
    }

    // Get diet plans by gym
    getDietPlansByGym(gymId: string): Observable<DietPlan[]> {
        return this.getDietPlans(gymId);
    }

    // Get diet plans for a specific member
    getMemberDietPlans(memberId: string, gymId?: string): Observable<DietPlan[]> {
        return this.getDietPlans(gymId, memberId);
    }

    // ==========================================
    // DIET DAYS
    // ==========================================
    createDay(dietId: string, day: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/${dietId}/days`, day);
    }

    updateDay(id: string, day: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/days/${id}`, day);
    }

    deleteDay(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/days/${id}`);
    }

    // ==========================================
    // MEAL SLOTS
    // ==========================================
    createSlot(dayId: string, slot: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/days/${dayId}/meal-slots`, slot);
    }

    updateSlot(id: string, slot: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/meal-slots/${id}`, slot);
    }

    deleteSlot(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/meal-slots/${id}`);
    }

    // ==========================================
    // MEAL ITEMS
    // ==========================================
    addMealItem(slotId: string, item: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/meal-slots/${slotId}/meals`, item);
    }

    updateMealItem(id: string, item: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/meal-items/${id}`, item);
    }

    removeMealItem(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/meal-items/${id}`);
    }

    // ==========================================
    // ASSIGNMENT
    // ==========================================
    assignDietPlan(assignment: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/assign`, assignment);
    }
}
