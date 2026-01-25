import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/upload`;

    uploadFile(file: File, folder: string = 'general'): Observable<{ success: boolean; url: string }> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        return this.http.post<{ success: boolean; url: string }>(this.apiUrl, formData);
    }

    deleteFile(fileUrl: string): Observable<any> {
        return this.http.delete(this.apiUrl, { body: { url: fileUrl } });
    }
}
