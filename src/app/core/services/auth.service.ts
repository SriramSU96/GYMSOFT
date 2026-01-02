
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse, User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;

    constructor(private http: HttpClient) { }

    register(userData: any): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/register`, userData);
    }

    changePassword(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/change-password`, data);
    }

    login(credentials: any): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
    }

    getMe(): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/me`);
    }

    logout() {
        localStorage.removeItem('token');
        // Dispatching action would be handled by effects if we had a logout action that called this.
        // But if component calls this directly, we just clear token. 
        // Better: Component dispatches '[Auth] Logout', Effect calls this service.logout (if API call needed) or just clears state + localStorage.
        // For now, I'll just add the method.
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    getCurrentUser(): User | null {
        const userStr = localStorage.getItem('user'); // Assuming user object is stored in localStorage
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch (e) {
                console.error('Error parsing user from localStorage', e);
                return null;
            }
        }
        return null;
    }
}
