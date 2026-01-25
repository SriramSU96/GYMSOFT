import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditLog, Role, SecurityStats, SecurityLogFilter } from '../models/security.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SecurityService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/security`;

    // Audit Logs
    getLogs(filter: SecurityLogFilter = {}): Observable<{ success: boolean; data: AuditLog[] }> {
        let params = new HttpParams();
        Object.keys(filter).forEach(key => {
            if (filter[key as keyof SecurityLogFilter]) {
                params = params.set(key, filter[key as keyof SecurityLogFilter] as string);
            }
        });
        return this.http.get<{ success: boolean; data: AuditLog[] }>(`${this.apiUrl}/logs`, { params });
    }

    // Stats
    getSecurityStats(): Observable<{ success: boolean; data: SecurityStats }> {
        return this.http.get<{ success: boolean; data: SecurityStats }>(`${this.apiUrl}/stats`);
    }

    // Role Management (Basic)
    getRoles(): Observable<{ success: boolean; data: Role[] }> {
        return this.http.get<{ success: boolean; data: Role[] }>(`${this.apiUrl}/roles`);
    }

    // Session Management
    revokeSession(sessionId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/sessions/${sessionId}`);
    }
}
