import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditLog, Role } from '../models/security.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SecurityService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/security`;

    getLogs(): Observable<AuditLog[]> {
        return this.http.get<AuditLog[]>(`${this.apiUrl}/logs`);
    }

    getRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(`${this.apiUrl}/roles`);
    }
}
