import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestSummaryComponent } from '../request-summary/request-summary.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RequestSummaryComponent],
  template: `
    <div class="home-container">
      <h1 class="page-title">
        <i class="bi bi-house-door me-2"></i>
        Dashboard
      </h1>
      
      <!-- Request Summary Section -->
      <app-request-summary></app-request-summary>
      
      <!-- Additional dashboard content can be added here -->
    </div>
  `,
  styles: [`
    .home-container {
      padding: 24px;
    }

    .page-title {
      margin-bottom: 24px;
      color: #1f2937;
      font-size: 1.875rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .page-title i {
      color: var(--primary-color);
    }
  `]
})
export class HomeComponent {} 