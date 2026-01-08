import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface ConfirmDialogData {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
}

@Injectable({
    providedIn: 'root'
})
export class ConfirmDialogService {
    private dialogSubject = new Subject<ConfirmDialogData>();
    private responseSubject = new Subject<boolean>();

    public dialog$ = this.dialogSubject.asObservable();
    public response$ = this.responseSubject.asObservable();

    confirm(data: ConfirmDialogData): Observable<boolean> {
        this.dialogSubject.next(data);
        return this.response$;
    }

    respond(confirmed: boolean) {
        this.responseSubject.next(confirmed);
    }
}
