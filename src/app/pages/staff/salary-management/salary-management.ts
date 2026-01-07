import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-salary-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './salary-management.html',
  styleUrl: './salary-management.css'
})
export class SalaryManagement {
  salaries = [
    { staffName: 'John Doe', month: 12, year: 2025, amount: 3000, status: 'Paid' },
    { staffName: 'Jane Smith', month: 12, year: 2025, amount: 3500, status: 'Pending' }
  ];
}
