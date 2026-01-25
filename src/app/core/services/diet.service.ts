import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
    DietPlan, DietPlanResponse, DietPlansResponse,
    DietDay, DietMealSlot, DietMealItem, AssignedDietPlan,
    DietMeal
} from '../models/diet.model';

@Injectable({
    providedIn: 'root'
})
export class DietService {
    private apiUrl = `${environment.apiUrl}/diets`;

    constructor(private http: HttpClient) { }

    // Plan CRUD
    getPlans(params: any = {}): Observable<DietPlansResponse> {
        let httpParams = new HttpParams();
        Object.keys(params).forEach(key => {
            if (params[key] !== undefined && params[key] !== null) {
                httpParams = httpParams.append(key, params[key]);
            }
        });
        return this.http.get<DietPlansResponse>(this.apiUrl, { params: httpParams });
    }

    getPlanById(id: string): Observable<any> { // Returns plan + days + meals
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    createPlan(plan: Partial<DietPlan>): Observable<DietPlanResponse> {
        return this.http.post<DietPlanResponse>(this.apiUrl, plan);
    }

    updatePlan(id: string, plan: Partial<DietPlan>): Observable<DietPlanResponse> {
        return this.http.put<DietPlanResponse>(`${this.apiUrl}/${id}`, plan);
    }

    deactivatePlan(id: string): Observable<{ success: boolean; message: string }> {
        return this.http.patch<{ success: boolean; message: string }>(`${this.apiUrl}/${id}/deactivate`, {});
    }

    deletePlan(id: string): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`);
    }

    // Days & Meals
    addDays(planId: string, day: { dayNumber: number; title: string }): Observable<{ success: boolean; day: DietDay }> {
        return this.http.post<{ success: boolean; day: DietDay }>(`${this.apiUrl}/${planId}/days`, day);
    }

    addMealSlot(dayId: string, slot: { slotName: string; time?: string }): Observable<{ success: boolean; mealSlot: DietMealSlot }> {
        return this.http.post<{ success: boolean; mealSlot: DietMealSlot }>(`${this.apiUrl}/days/${dayId}/meal-slots`, slot);
    }

    addMealItem(slotId: string, item: Partial<DietMealItem>): Observable<{ success: boolean; mealItem: DietMealItem }> {
        return this.http.post<{ success: boolean; mealItem: DietMealItem }>(`${this.apiUrl}/meal-slots/${slotId}/meals`, item);
    }

    // Builder Aliases & Helpers
    createDay(planId: string, day: { dayNumber: number; title?: string }): Observable<DietDay> {
        return this.http.post<DietDay>(`${this.apiUrl}/${planId}/days`, day);
    }

    deleteDay(dayId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/days/${dayId}`);
    }

    createSlot(dayId: string, slot: { mealTime: string }): Observable<DietMealSlot> {
        return this.http.post<DietMealSlot>(`${this.apiUrl}/days/${dayId}/meal-slots`, { ...slot, slotName: slot.mealTime });
    }

    deleteSlot(slotId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/meal-slots/${slotId}`);
    }

    updateMealItem(itemId: string, updates: Partial<DietMealItem>): Observable<DietMealItem> {
        return this.http.patch<DietMealItem>(`${this.apiUrl}/meal-items/${itemId}`, updates);
    }

    removeMealItem(itemId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/meal-items/${itemId}`);
    }



    // Assignment
    assignPlan(assignment: { memberId: string; dietPlanId: string; startDate: Date; endDate?: Date }): Observable<{ success: boolean; assignment: AssignedDietPlan }> {
        return this.http.post<{ success: boolean; assignment: AssignedDietPlan }>(`${this.apiUrl}/assign`, assignment);
    }

    getMemberDiet(memberId: string): Observable<{ success: boolean; diet: AssignedDietPlan }> {
        return this.http.get<{ success: boolean; diet: AssignedDietPlan }>(`${this.apiUrl}/member/${memberId}`);
    }

    // Meals Library
    getMeals(params: any = {}): Observable<{ success: boolean; meals: DietMeal[] }> {
        let httpParams = new HttpParams();
        Object.keys(params).forEach(key => {
            if (params[key] !== undefined && params[key] !== null) {
                httpParams = httpParams.append(key, params[key]);
            }
        });
        return this.http.get<{ success: boolean; meals: DietMeal[] }>(`${this.apiUrl}/meals`, { params: httpParams });
    }

    getMeal(id: string): Observable<DietMeal> {
        return this.http.get<DietMeal>(`${this.apiUrl}/meals/${id}`);
    }

    createMeal(meal: Partial<DietMeal>): Observable<DietMeal> {
        return this.http.post<DietMeal>(`${this.apiUrl}/meals`, meal);
    }

    updateMeal(id: string, meal: Partial<DietMeal>): Observable<DietMeal> {
        return this.http.put<DietMeal>(`${this.apiUrl}/meals/${id}`, meal);
    }

    deactivateMeal(id: string): Observable<any> {
        return this.http.patch(`${this.apiUrl}/meals/${id}/deactivate`, {});
    }
}
