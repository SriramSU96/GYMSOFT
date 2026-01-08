import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="toast-container">
      <div *ngFor="let toast of toasts" 
           [class]="'toast toast-' + toast.type"
           [@slideIn]>
        <span class="material-icons toast-icon">
          {{ getIcon(toast.type) }}
        </span>
        <span class="toast-message">{{ toast.message }}</span>
      </div>
    </div>
  `,
    styles: [`
    .toast-container {
      position: fixed;
      top: 80px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pointer-events: none;
    }

    .toast {
      min-width: 300px;
      max-width: 500px;
      padding: 16px 20px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.95rem;
      font-weight: 500;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      animation: slideIn 0.3s ease-out;
      pointer-events: auto;
    }

    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .toast-success {
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2));
      border-left: 4px solid #10b981;
      color: #6ee7b7;
    }

    .toast-error {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2));
      border-left: 4px solid #ef4444;
      color: #fca5a5;
    }

    .toast-warning {
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.2));
      border-left: 4px solid #f59e0b;
      color: #fcd34d;
    }

    .toast-info {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2));
      border-left: 4px solid #3b82f6;
      color: #93c5fd;
    }

    .toast-icon {
      font-size: 24px;
      flex-shrink: 0;
    }

    .toast-message {
      flex: 1;
      line-height: 1.5;
    }
  `]
})
export class ToastComponent implements OnInit, OnDestroy {
    toasts: Toast[] = [];
    private subscription?: Subscription;

    constructor(private toastService: ToastService) { }

    ngOnInit() {
        this.subscription = this.toastService.toast$.subscribe(toast => {
            this.toasts.push(toast);
            setTimeout(() => {
                this.removeToast(toast);
            }, toast.duration || 3000);
        });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    removeToast(toast: Toast) {
        const index = this.toasts.indexOf(toast);
        if (index > -1) {
            this.toasts.splice(index, 1);
        }
    }

    getIcon(type: Toast['type']): string {
        const icons = {
            success: 'check_circle',
            error: 'error',
            warning: 'warning',
            info: 'info'
        };
        return icons[type];
    }
}
