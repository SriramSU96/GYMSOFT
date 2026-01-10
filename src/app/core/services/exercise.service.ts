
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    Exercise,
    ExerciseListResponse,
    ExerciseFilters,
    CreateExerciseDto,
    UpdateExerciseDto
} from '../models/exercise.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {
    private apiUrl = `${environment.apiUrl}/exercises`;

    constructor(private http: HttpClient) { }

    getExercises(
        filters?: ExerciseFilters,
        pageSize: number = 20,
        pageNumber: number = 1
    ): Observable<ExerciseListResponse> {
        let params = new HttpParams();
        params = params.set('pageSize', pageSize.toString());
        params = params.set('pageNumber', pageNumber.toString());

        if (filters) {
            if (filters.muscleGroup) {
                params = params.set('muscleGroup', filters.muscleGroup);
            }
            if (filters.difficulty) {
                params = params.set('difficulty', filters.difficulty);
            }
            if (filters.equipment) {
                params = params.set('equipment', filters.equipment);
            }
            if (filters.search) {
                params = params.set('search', filters.search);
            }
            if (filters.includeInactive !== undefined) {
                params = params.set('includeInactive', filters.includeInactive.toString());
            }
        }

        return this.http.get<ExerciseListResponse>(this.apiUrl, { params });
    }

    getExercise(id: string): Observable<Exercise> {
        return this.http.get<Exercise>(`${this.apiUrl}/${id}`);
    }

    createExercise(exercise: CreateExerciseDto): Observable<Exercise> {
        return this.http.post<Exercise>(this.apiUrl, exercise);
    }

    updateExercise(id: string, changes: UpdateExerciseDto): Observable<Exercise> {
        return this.http.put<Exercise>(`${this.apiUrl}/${id}`, changes);
    }

    activateExercise(id: string): Observable<{ message: string; exercise: Exercise }> {
        return this.http.patch<{ message: string; exercise: Exercise }>(
            `${this.apiUrl}/${id}/activate`,
            {}
        );
    }

    deactivateExercise(id: string): Observable<{ message: string; exercise: Exercise }> {
        return this.http.patch<{ message: string; exercise: Exercise }>(
            `${this.apiUrl}/${id}/deactivate`,
            {}
        );
    }

    deleteExercise(id: string): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
    }
}
