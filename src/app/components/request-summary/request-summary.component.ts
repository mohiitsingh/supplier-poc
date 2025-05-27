import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

interface RequestSummary {
  openRequests: number;
  closedRequests: number;
  newRequests: number;
  priorityLevels: {
    high: number;
    medium: number;
    low: number;
  };
}

@Component({
  selector: 'app-request-summary',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule],
  template: `
    <div class="summary-container">
      <div class="summary-row">
        <!-- Request Status Cards -->
        <mat-card class="summary-card status-open">
          <mat-card-content>
            <div class="card-content">
              <div class="card-icon">
                <i class="bi bi-folder2-open"></i>
              </div>
              <div class="card-info">
                <h3>{{ summary.openRequests }}</h3>
                <p>Open Requests</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="summary-card status-closed">
          <mat-card-content>
            <div class="card-content">
              <div class="card-icon">
                <i class="bi bi-check2-circle"></i>
              </div>
              <div class="card-info">
                <h3>{{ summary.closedRequests }}</h3>
                <p>Closed Requests</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="summary-card status-new">
          <mat-card-content>
            <div class="card-content">
              <div class="card-icon">
                <i class="bi bi-plus-circle"></i>
              </div>
              <div class="card-info">
                <h3>{{ summary.newRequests }}</h3>
                <p>New Requests</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Priority Distribution Card -->
      <mat-card class="priority-card">
        <mat-card-header>
          <mat-card-title>Priority Distribution</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="priority-stats">
            <div class="priority-item priority-high">
              <div class="priority-info">
                <i class="bi bi-flag-fill"></i>
                <span>High Priority</span>
              </div>
              <div class="priority-count">{{ summary.priorityLevels.high }}</div>
            </div>
            <mat-divider></mat-divider>
            <div class="priority-item priority-medium">
              <div class="priority-info">
                <i class="bi bi-flag-fill"></i>
                <span>Medium Priority</span>
              </div>
              <div class="priority-count">{{ summary.priorityLevels.medium }}</div>
            </div>
            <mat-divider></mat-divider>
            <div class="priority-item priority-low">
              <div class="priority-info">
                <i class="bi bi-flag-fill"></i>
                <span>Low Priority</span>
              </div>
              <div class="priority-count">{{ summary.priorityLevels.low }}</div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .summary-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 24px;
    }

    .summary-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
    }

    .summary-card {
      border-radius: 12px;
      border: none;
      transition: transform 0.3s ease;
    }

    .summary-card:hover {
      transform: translateY(-5px);
    }

    .card-content {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
    }

    .card-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      font-size: 24px;
    }

    .card-info h3 {
      font-size: 28px;
      font-weight: 600;
      margin: 0;
      line-height: 1.2;
    }

    .card-info p {
      margin: 4px 0 0;
      color: #6b7280;
      font-size: 14px;
    }

    .status-open {
      background: linear-gradient(135deg, #e0f2fe 0%, #ffffff 100%);
      .card-icon {
        background-color: #0ea5e9;
        color: white;
      }
      .card-info h3 {
        color: #0369a1;
      }
    }

    .status-closed {
      background: linear-gradient(135deg, #dcfce7 0%, #ffffff 100%);
      .card-icon {
        background-color: #22c55e;
        color: white;
      }
      .card-info h3 {
        color: #15803d;
      }
    }

    .status-new {
      background: linear-gradient(135deg, #dbeafe 0%, #ffffff 100%);
      .card-icon {
        background-color: #3b82f6;
        color: white;
      }
      .card-info h3 {
        color: #1d4ed8;
      }
    }

    .priority-card {
      border-radius: 12px;
      border: none;
    }

    .priority-stats {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 0;
    }

    .priority-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
    }

    .priority-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 16px;
    }

    .priority-count {
      font-size: 18px;
      font-weight: 600;
    }

    .priority-high {
      i { color: #dc2626; }
      .priority-count { color: #dc2626; }
    }

    .priority-medium {
      i { color: #f59e0b; }
      .priority-count { color: #f59e0b; }
    }

    .priority-low {
      i { color: #10b981; }
      .priority-count { color: #10b981; }
    }
  `]
})
export class RequestSummaryComponent implements OnInit {
  summary: RequestSummary = {
    openRequests: 0,
    closedRequests: 0,
    newRequests: 0,
    priorityLevels: {
      high: 0,
      medium: 0,
      low: 0
    }
  };

  ngOnInit() {
    // For demonstration, we'll set some sample data
    // In a real application, this would come from a service
    this.summary = {
      openRequests: 12,
      closedRequests: 8,
      newRequests: 5,
      priorityLevels: {
        high: 4,
        medium: 7,
        low: 9
      }
    };
  }
}
