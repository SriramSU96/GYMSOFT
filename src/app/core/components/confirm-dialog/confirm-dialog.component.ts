import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogService, ConfirmDialogData } from '../../services/confirm-dialog.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div *ngIf="isVisible" class="confirm-overlay" (click)="onCancel()">
      <div class="confirm-dialog" (click)="$event.stopPropagation()">
        <div class="confirm-header" [class]="'confirm-header-' + (dialogData?.type || 'danger')">
          <span class="material-icons confirm-icon">
            {{ getIcon() }}
          </span>
          <h3 class="confirm-title">{{ dialogData?.title }}</h3>
        </div>
        
        <div class="confirm-body">
          <p class="confirm-message">{{ dialogData?.message }}</p>
        </div>
        
        <div class="confirm-actions">
          <button (click)="onCancel()" class="btn btn-ghost">
            {{ dialogData?.cancelText || 'Cancel' }}
          </button>
          <button (click)="onConfirm()" 
                  [class]="'btn btn-' + (dialogData?.type || 'danger')">
            {{ dialogData?.confirmText || 'Confirm' }}
          </button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .confirm-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .confirm-dialog {
      background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
      border: 2px solid rgba(212, 175, 55, 0.3);
      border-radius: 16px;
      width: 90%;
      max-width: 480px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05);
      overflow: hidden;
      animation: slideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes slideIn {
      from {
        transform: scale(0.85) translateY(-30px);
        opacity: 0;
      }
      to {
        transform: scale(1) translateY(0);
        opacity: 1;
      }
    }

    .confirm-header {
      padding: 28px 24px;
      display: flex;
      align-items: center;
      gap: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(0, 0, 0, 0.2);
    }

    .confirm-header-danger {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.1));
      border-bottom-color: rgba(239, 68, 68, 0.2);
    }

    .confirm-header-warning {
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.1));
      border-bottom-color: rgba(245, 158, 11, 0.2);
    }

    .confirm-header-info {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.1));
      border-bottom-color: rgba(59, 130, 246, 0.2);
    }

    .confirm-icon {
      font-size: 36px;
      color: #ef4444;
      filter: drop-shadow(0 2px 8px rgba(239, 68, 68, 0.5));
    }

    .confirm-header-warning .confirm-icon {
      color: #f59e0b;
      filter: drop-shadow(0 2px 8px rgba(245, 158, 11, 0.5));
    }

    .confirm-header-info .confirm-icon {
      color: #3b82f6;
      filter: drop-shadow(0 2px 8px rgba(59, 130, 246, 0.5));
    }

    .confirm-title {
      margin: 0;
      font-size: 1.35rem;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.02em;
    }

    .confirm-body {
      padding: 28px 24px;
      background: rgba(0, 0, 0, 0.1);
    }

    .confirm-message {
      margin: 0;
      font-size: 1rem;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.85);
      font-weight: 400;
    }

    .confirm-actions {
      padding: 20px 24px;
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      background: rgba(0, 0, 0, 0.25);
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }

    .btn {
      padding: 12px 28px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      border: none;
      display: flex;
      align-items: center;
      gap: 8px;
      letter-spacing: 0.01em;
      position: relative;
      overflow: hidden;
    }

    .btn::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }

    .btn:active::before {
      width: 300px;
      height: 300px;
    }

    .btn-ghost {
      background: rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.12);
    }

    .btn-ghost:hover {
      background: rgba(255, 255, 255, 0.14);
      color: #ffffff;
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }

    .btn-danger {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(239, 68, 68, 0.3);
    }

    .btn-danger:hover {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(239, 68, 68, 0.5);
    }

    .btn-warning {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(245, 158, 11, 0.3);
    }

    .btn-warning:hover {
      background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(245, 158, 11, 0.5);
    }

    .btn-info {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
    }

    .btn-info:hover {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
    }

    .btn:active {
      transform: translateY(0);
    }
  `]
})
export class ConfirmDialogComponent implements OnInit, OnDestroy {
    isVisible = false;
    dialogData: ConfirmDialogData | null = null;
    private subscription?: Subscription;

    constructor(private confirmService: ConfirmDialogService) { }

    ngOnInit() {
        this.subscription = this.confirmService.dialog$.subscribe(data => {
            this.dialogData = data;
            this.isVisible = true;
        });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    onConfirm() {
        this.confirmService.respond(true);
        this.isVisible = false;
    }

    onCancel() {
        this.confirmService.respond(false);
        this.isVisible = false;
    }

    getIcon(): string {
        const icons = {
            danger: 'warning',
            warning: 'error_outline',
            info: 'info'
        };
        return icons[this.dialogData?.type || 'danger'];
    }
}
