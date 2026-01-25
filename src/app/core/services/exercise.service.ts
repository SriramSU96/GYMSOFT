import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Exercise, ExerciseResponse, ExercisesResponse } from '../models/exercise.model';

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {
    private apiUrl = `${environment.apiUrl}/exercises`;

    constructor(private http: HttpClient) { }

    getExercises(params: any = {}): Observable<ExercisesResponse> {
        let httpParams = new HttpParams();
        Object.keys(params).forEach(key => {
            if (params[key]) httpParams = httpParams.append(key, params[key]);
        });
        return this.http.get<ExercisesResponse>(this.apiUrl, { params: httpParams });
    }

    getExerciseById(id: string): Observable<ExerciseResponse> {
        return this.http.get<ExerciseResponse>(`${this.apiUrl}/${id}`);
    }

    createExercise(exercise: Partial<Exercise>): Observable<ExerciseResponse> {
        return this.http.post<ExerciseResponse>(this.apiUrl, exercise);
    }

    updateExercise(id: string, exercise: Partial<Exercise>): Observable<ExerciseResponse> {
        return this.http.put<ExerciseResponse>(`${this.apiUrl}/${id}`, exercise);
    }

    deleteExercise(id: string): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`);
    }

    activateExercise(id: string): Observable<{ success: boolean; exercise: Exercise }> {
        return this.http.patch<{ success: boolean; exercise: Exercise }>(`${this.apiUrl}/${id}/activate`, {});
    }

    deactivateExercise(id: string): Observable<{ success: boolean; exercise: Exercise }> {
        return this.http.patch<{ success: boolean; exercise: Exercise }>(`${this.apiUrl}/${id}/deactivate`, {});
    }
}
