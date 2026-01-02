
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosService } from '../../../core/services/pos.service';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-sales-report',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './sales-report.component.html',
    styleUrls: ['./sales-report.component.css']
})
export class SalesReport implements OnInit {
    salesData: any = null;
    isLoading = false;
    filterForm: FormGroup;
    today = new Date().toISOString().split('T')[0];

    constructor(
        private posService: PosService,
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.filterForm = this.fb.group({
            date: [this.today]
        });
    }

    ngOnInit(): void {
        this.loadReport();
    }

    loadReport(): void {
        const user = this.authService.getCurrentUser();
        if (!user?.gymId) return;

        this.isLoading = true;
        const date = this.filterForm.get('date')?.value;

        this.posService.getSalesReport(user.gymId, date).subscribe({
            next: (data) => {
                this.salesData = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error fetching sales report', err);
                this.isLoading = false;
            }
        });
    }
}
