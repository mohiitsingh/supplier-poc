import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule
  ],
  template: `
    <div class="forum-container">
      <div class="forum-header">
        <h1>Discussion Forum</h1>
        <button mat-raised-button color="primary">
          <i class="bi bi-plus-lg me-2"></i>
          New Topic
        </button>
      </div>

      <div class="forum-content">
        <mat-card class="topic-list">
          <mat-nav-list>
            <!-- Featured Topics -->
            <h3 matSubheader>Featured Topics</h3>
            <a mat-list-item *ngFor="let topic of featuredTopics">
              <div class="topic-item">
                <div class="topic-icon">
                  <i class="bi bi-star-fill"></i>
                </div>
                <div class="topic-info">
                  <h4>{{topic.title}}</h4>
                  <p>{{topic.description}}</p>
                  <div class="topic-meta">
                    <span><i class="bi bi-chat-dots"></i> {{topic.replies}}</span>
                    <span><i class="bi bi-eye"></i> {{topic.views}}</span>
                    <span><i class="bi bi-clock"></i> {{topic.lastActivity}}</span>
                  </div>
                </div>
                <div class="topic-status" *ngIf="topic.unread">
                  <span class="status-badge">New</span>
                </div>
              </div>
            </a>

            <mat-divider></mat-divider>

            <!-- Recent Topics -->
            <h3 matSubheader>Recent Discussions</h3>
            <a mat-list-item *ngFor="let topic of recentTopics">
              <div class="topic-item">
                <div class="topic-icon">
                  <i class="bi bi-chat-square-text"></i>
                </div>
                <div class="topic-info">
                  <h4>{{topic.title}}</h4>
                  <p>{{topic.description}}</p>
                  <div class="topic-meta">
                    <span><i class="bi bi-chat-dots"></i> {{topic.replies}}</span>
                    <span><i class="bi bi-eye"></i> {{topic.views}}</span>
                    <span><i class="bi bi-clock"></i> {{topic.lastActivity}}</span>
                  </div>
                </div>
                <div class="topic-status" *ngIf="topic.unread">
                  <span class="status-badge">New</span>
                </div>
              </div>
            </a>
          </mat-nav-list>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .forum-container {
      padding: 24px;
      height: 100%;
      background-color: #f9fafb;
    }

    .forum-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .forum-header h1 {
      font-size: 1.875rem;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }

    .forum-content {
      display: grid;
      gap: 24px;
    }

    .topic-list {
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }

    .topic-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 12px;
      width: 100%;
    }

    .topic-icon {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .topic-icon i {
      color: var(--primary-color);
    }

    .topic-info {
      flex: 1;
      min-width: 0;
    }

    .topic-info h4 {
      margin: 0 0 4px;
      font-size: 1rem;
      font-weight: 500;
      color: #111827;
    }

    .topic-info p {
      margin: 0 0 8px;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .topic-meta {
      display: flex;
      gap: 16px;
      font-size: 0.75rem;
      color: #6b7280;
    }

    .topic-meta span {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .topic-meta i {
      font-size: 1rem;
    }

    .topic-status {
      flex-shrink: 0;
    }

    .status-badge {
      background-color: var(--primary-color);
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    mat-nav-list {
      padding: 0;
    }

    h3[matSubheader] {
      font-size: 0.75rem;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      padding: 16px;
      margin: 0;
    }
  `]
})
export class ForumComponent {
  featuredTopics = [
    {
      title: 'Important: System Maintenance Schedule',
      description: 'Updates regarding planned system maintenance and downtime.',
      replies: 15,
      views: 234,
      lastActivity: '2h ago',
      unread: true
    },
    {
      title: 'New Supplier Guidelines 2024',
      description: 'Review the updated supplier guidelines and compliance requirements.',
      replies: 8,
      views: 156,
      lastActivity: '4h ago',
      unread: false
    }
  ];

  recentTopics = [
    {
      title: 'Delivery Schedule Changes',
      description: 'Discussion about upcoming changes to the delivery schedule.',
      replies: 12,
      views: 189,
      lastActivity: '1h ago',
      unread: true
    },
    {
      title: 'Quality Control Standards',
      description: 'Updates to quality control procedures and requirements.',
      replies: 5,
      views: 98,
      lastActivity: '3h ago',
      unread: false
    },
    {
      title: 'Invoice Processing Updates',
      description: 'New process for submitting and tracking invoices.',
      replies: 3,
      views: 67,
      lastActivity: '5h ago',
      unread: true
    }
  ];
} 