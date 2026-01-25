import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, LoginResponse } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private userSubject = new BehaviorSubject<User | null>(null);
    public user$ = this.userSubject.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.loadUserFromStorage();
    }

    get currentUserValue(): User | null {
        return this.userSubject.value;
    }

    login(credentials: { email: string; password: string }): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                if (response.success && response.token) {
                    this.setSession(response.user, response.token);
                }
            })
        );
    }

    register(userData: Partial<User> & { password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, userData).pipe(
            tap((response: any) => {
                if (response.success && response.token) {
                    this.setSession(response.user, response.token);
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/auth/login']);
    }

    getMe(): Observable<{ success: boolean; user: User }> {
        return this.http.get<{ success: boolean; user: User }>(`${this.apiUrl}/me`).pipe(
            tap(response => {
                if (response.success) {
                    this.userSubject.next(response.user);
                    localStorage.setItem('user', JSON.stringify(response.user));
                }
            })
        );
    }

    private setSession(user: User, token: string): void {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
    }

    private loadUserFromStorage(): void {
        const userJson = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (userJson && token) {
            try {
                const user = JSON.parse(userJson);
                this.userSubject.next(user);
            } catch (e) {
                console.error('Error parsing user from storage', e);
                this.logout();
            }
        }
    }

    isAuthenticated(): boolean {
        return !!this.userSubject.value && !!localStorage.getItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    hasRole(roles: string[]): boolean {
        const user = this.currentUserValue;
        return !!user && roles.includes(user.role);
    }

    changePassword(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/update-password`, data);
    }
}
