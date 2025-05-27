import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CollaborationService } from '../../services/collaboration.service';
import { TicketComment, CommentReaction } from '../../models/collaboration.models';

@Component({
  selector: 'app-ticket-comments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule
  ],
  template: `
    <div class="comments-container">
      <mat-card class="comment-input-card">
        <mat-card-content>
          <div class="comment-input-container">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Add a comment</mat-label>
              <textarea
                matInput
                [(ngModel)]="newComment"
                placeholder="Type your comment here..."
                rows="3"
              ></textarea>
            </mat-form-field>
            <div class="comment-actions">
              <button
                mat-button
                color="primary"
                [disabled]="!newComment.trim()"
                (click)="addComment()"
              >
                <i class="bi bi-send me-2"></i>
                Send
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <div class="comments-list">
        @for (comment of comments; track comment.id) {
          <mat-card class="comment-card">
            <mat-card-content>
              <div class="comment-header">
                <div class="comment-author">
                  <div class="author-avatar">
                    {{ comment.senderId.charAt(0).toUpperCase() }}
                  </div>
                  <div class="author-info">
                    <span class="author-name">User {{ comment.senderId }}</span>
                    <span class="comment-time">
                      {{ comment.timestamp | date:'medium' }}
                      @if (comment.isEdited) {
                        <span class="edited-mark">(edited)</span>
                      }
                    </span>
                  </div>
                </div>
                <button mat-icon-button [matMenuTriggerFor]="menu">
                  <i class="bi bi-three-dots-vertical"></i>
                </button>
                <mat-menu #menu="matMenu">
                  <button mat-menu-item (click)="editComment(comment)">
                    <i class="bi bi-pencil me-2"></i>
                    Edit
                  </button>
                  <button mat-menu-item class="text-danger" (click)="deleteComment(comment)">
                    <i class="bi bi-trash me-2"></i>
                    Delete
                  </button>
                </mat-menu>
              </div>

              <div class="comment-content">
                {{ comment.content }}
              </div>

              <div class="comment-footer">
                <div class="reaction-buttons">
                  @for (reaction of availableReactions; track reaction) {
                    <button
                      mat-icon-button
                      [matTooltip]="getReactionTooltip(comment, reaction)"
                      (click)="toggleReaction(comment, reaction)"
                      [class.active]="hasUserReacted(comment, reaction)"
                    >
                      {{ reaction }}
                    </button>
                  }
                </div>
                <button mat-button (click)="replyToComment(comment)">
                  <i class="bi bi-reply me-2"></i>
                  Reply
                </button>
              </div>

              @if (comment.reactions?.length) {
                <div class="reactions-summary">
                  @for (reaction of getUniqueReactions(comment); track reaction) {
                    <span class="reaction-chip" [matTooltip]="getReactionTooltip(comment, reaction)">
                      {{ reaction }}
                      {{ getReactionCount(comment, reaction) }}
                    </span>
                  }
                </div>
              }
            </mat-card-content>
          </mat-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .comments-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
    }

    .comment-input-card {
      border-radius: 8px;
    }

    .comment-input-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .full-width {
      width: 100%;
    }

    .comment-actions {
      display: flex;
      justify-content: flex-end;
    }

    .comments-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .comment-card {
      border-radius: 8px;
    }

    .comment-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }

    .comment-author {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .author-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: var(--primary-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
    }

    .author-info {
      display: flex;
      flex-direction: column;
    }

    .author-name {
      font-weight: 500;
      color: #1f2937;
    }

    .comment-time {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .edited-mark {
      font-size: 0.75rem;
      color: #6b7280;
      margin-left: 4px;
    }

    .comment-content {
      color: #1f2937;
      line-height: 1.5;
      margin-bottom: 12px;
    }

    .comment-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
    }

    .reaction-buttons {
      display: flex;
      gap: 4px;
    }

    .reaction-buttons button {
      font-size: 1rem;
      padding: 4px;
    }

    .reaction-buttons button.active {
      background-color: #e5e7eb;
    }

    .reactions-summary {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    .reaction-chip {
      background-color: #f3f4f6;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.875rem;
      color: #4b5563;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .text-danger {
      color: #dc2626;
    }
  `]
})
export class TicketCommentsComponent implements OnInit {
  @Input() ticketId!: string;

  comments: TicketComment[] = [];
  newComment = '';
  availableReactions = ['👍', '👎', '❤️', '😄', '🎉', '❓'];

  constructor(private collaborationService: CollaborationService) {}

  ngOnInit() {
    this.loadComments();
  }

  private loadComments() {
    this.collaborationService.getTicketComments(this.ticketId)
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  addComment() {
    if (this.newComment.trim()) {
      this.collaborationService.addTicketComment({
        ticketId: this.ticketId,
        content: this.newComment.trim()
      });
      this.newComment = '';
      this.loadComments();
    }
  }

  editComment(comment: TicketComment) {
    // Implement edit functionality
    console.log('Edit comment:', comment);
  }

  deleteComment(comment: TicketComment) {
    // Implement delete functionality
    console.log('Delete comment:', comment);
  }

  replyToComment(comment: TicketComment) {
    // Implement reply functionality
    console.log('Reply to comment:', comment);
  }

  toggleReaction(comment: TicketComment, reactionType: string) {
    if (!comment.reactions) {
      comment.reactions = [];
    }

    const userId = '1'; // Replace with actual user ID
    const existingReaction = comment.reactions.findIndex(
      r => r.userId === userId && r.type === reactionType
    );

    if (existingReaction !== -1) {
      comment.reactions.splice(existingReaction, 1);
    } else {
      comment.reactions.push({ userId, type: reactionType as any });
    }
  }

  hasUserReacted(comment: TicketComment, reactionType: string): boolean {
    const userId = '1'; // Replace with actual user ID
    return comment.reactions?.some(
      r => r.userId === userId && r.type === reactionType
    ) || false;
  }

  getUniqueReactions(comment: TicketComment): string[] {
    if (!comment.reactions?.length) return [];
    return Array.from(new Set(comment.reactions.map(r => r.type)));
  }

  getReactionCount(comment: TicketComment, reactionType: string): number {
    return comment.reactions?.filter(r => r.type === reactionType).length || 0;
  }

  getReactionTooltip(comment: TicketComment, reactionType: string): string {
    const count = this.getReactionCount(comment, reactionType);
    return `${count} ${count === 1 ? 'person' : 'people'} reacted with ${reactionType}`;
  }
} 