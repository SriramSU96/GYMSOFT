import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Member } from '../models/member.model';

@Injectable({
    providedIn: 'root'
})
export class MemberInfoModalService {
    private modalSubject = new Subject<Member | null>();
    public modal$ = this.modalSubject.asObservable();

    show(member: Member) {
        this.modalSubject.next(member);
    }

    close() {
        this.modalSubject.next(null);
    }
}
