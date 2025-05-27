import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CollaborationService } from '../../services/collaboration.service';
import { Chat, ChatMessage, User } from '../../models/collaboration.models';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule
  ],
  template: `
    <div class="chat-container">
      <!-- Chat List -->
      <div class="chat-list">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Conversations</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="chat-actions">
              <button mat-button color="primary" (click)="startNewChat()">
                <i class="bi bi-chat-dots me-2"></i>
                New Chat
              </button>
              <button mat-button color="primary" (click)="createGroup()">
                <i class="bi bi-people me-2"></i>
                New Group
              </button>
            </div>
            <mat-divider></mat-divider>
            <mat-nav-list>
              @for (chat of chats; track chat.id) {
                <a mat-list-item (click)="selectChat(chat)" [class.active]="selectedChat?.id === chat.id">
                  <div class="chat-list-item">
                    <div class="chat-avatar">
                      @if (chat.type === 'direct') {
                        {{ getOtherParticipantInitial(chat) }}
                      } @else {
                        <i class="bi bi-people-fill"></i>
                      }
                    </div>
                    <div class="chat-info">
                      <div class="chat-name">
                        {{ chat.type === 'direct' ? getOtherParticipantName(chat) : chat.name }}
                      </div>
                      @if (chat.lastMessage) {
                        <div class="last-message">
                          {{ chat.lastMessage.content }}
                        </div>
                      }
                    </div>
                    <div class="chat-meta">
                      @if (chat.lastMessage) {
                        <span class="message-time">
                          {{ chat.lastMessage.timestamp | date:'shortTime' }}
                        </span>
                      }
                    </div>
                  </div>
                </a>
              }
            </mat-nav-list>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Chat Messages -->
      <div class="chat-messages">
        @if (selectedChat) {
          <mat-card class="messages-card">
            <mat-card-header>
              <div class="chat-header">
                <div class="chat-avatar">
                  @if (selectedChat.type === 'direct') {
                    {{ getOtherParticipantInitial(selectedChat) }}
                  } @else {
                    <i class="bi bi-people-fill"></i>
                  }
                </div>
                <div class="chat-info">
                  <div class="chat-name">
                    {{ selectedChat.type === 'direct' ? getOtherParticipantName(selectedChat) : selectedChat.name }}
                  </div>
                  <div class="chat-status">
                    @if (selectedChat.type === 'group') {
                      {{ selectedChat.participants.length }} members
                    } @else {
                      Online
                    }
                  </div>
                </div>
              </div>
            </mat-card-header>
            <mat-divider></mat-divider>
            <mat-card-content class="messages-content">
              <div class="messages-list">
                @for (message of messages; track message.id) {
                  <div class="message" [class.own-message]="message.senderId === currentUser?.id">
                    <div class="message-content">
                      <div class="message-text">{{ message.content }}</div>
                      <div class="message-meta">
                        <span class="message-time">{{ message.timestamp | date:'shortTime' }}</span>
                        @if (message.readBy.length > 1) {
                          <i class="bi bi-check2-all" matTooltip="Read"></i>
                        } @else {
                          <i class="bi bi-check2" matTooltip="Sent"></i>
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            </mat-card-content>
            <mat-divider></mat-divider>
            <mat-card-actions>
              <div class="message-input">
                <mat-form-field appearance="outline" class="full-width">
                  <input
                    matInput
                    [(ngModel)]="newMessage"
                    placeholder="Type a message..."
                    (keyup.enter)="sendMessage()"
                  >
                </mat-form-field>
                <button
                  mat-icon-button
                  color="primary"
                  [disabled]="!newMessage.trim()"
                  (click)="sendMessage()"
                >
                  <i class="bi bi-send"></i>
                </button>
              </div>
            </mat-card-actions>
          </mat-card>
        } @else {
          <div class="no-chat-selected">
            <i class="bi bi-chat-dots"></i>
            <p>Select a conversation to start chatting</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .chat-container {
      display: flex;
      gap: 24px;
      height: 100%;
      padding: 24px;
      background-color: #f9fafb;
    }

    .chat-list {
      width: 320px;
      flex-shrink: 0;
    }

    .chat-list mat-card {
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }

    .chat-actions {
      display: flex;
      gap: 8px;
      padding: 16px;
    }

    .chat-actions button {
      flex: 1;
      border-radius: 8px;
      padding: 8px 16px;
    }

    .chat-list-item {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 8px;
      border-radius: 8px;
      transition: all 0.2s ease;
    }

    .chat-avatar {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background-color: var(--primary-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 1.25rem;
    }

    .chat-info {
      flex: 1;
      min-width: 0;
    }

    .chat-name {
      font-weight: 500;
      color: #1f2937;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 2px;
    }

    .last-message {
      font-size: 0.875rem;
      color: #6b7280;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .chat-meta {
      font-size: 0.75rem;
      color: #6b7280;
    }

    .chat-messages {
      flex: 1;
      min-width: 0;
    }

    .messages-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }

    .chat-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      border-bottom: 1px solid #e5e7eb;
    }

    .chat-status {
      font-size: 0.875rem;
      color: #10b981;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .chat-status::before {
      content: '';
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #10b981;
    }

    .messages-content {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      background-color: #f9fafb;
    }

    .messages-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .message {
      display: flex;
      max-width: 70%;
    }

    .message.own-message {
      margin-left: auto;
      flex-direction: row-reverse;
    }

    .message-content {
      background-color: white;
      padding: 12px 16px;
      border-radius: 16px;
      box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.05);
      position: relative;
    }

    .own-message .message-content {
      background-color: var(--primary-color);
      color: white;
    }

    .message-text {
      line-height: 1.5;
    }

    .message-meta {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      color: #6b7280;
      margin-top: 4px;
    }

    .own-message .message-meta {
      color: rgba(255, 255, 255, 0.8);
    }

    .message-input {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background-color: white;
      border-top: 1px solid #e5e7eb;
    }

    .message-input mat-form-field {
      margin-bottom: -1.25em;
    }

    .full-width {
      width: 100%;
    }

    .no-chat-selected {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #6b7280;
      background-color: white;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }

    .no-chat-selected i {
      font-size: 48px;
      margin-bottom: 16px;
      color: var(--primary-color);
    }

    .active {
      background-color: #f3f4f6;
    }

    ::-webkit-scrollbar {
      width: 6px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #d1d5db;
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #9ca3af;
    }
  `]
})
export class ChatComponent implements OnInit {
  currentUser: User | null = null;
  chats: Chat[] = [];
  selectedChat: Chat | null = null;
  messages: ChatMessage[] = [];
  newMessage = '';

  constructor(private collaborationService: CollaborationService) {}

  ngOnInit() {
    // Load initial data
    this.loadChats();
  }

  private loadChats() {
    // For demonstration, create some sample chats
    this.chats = [
      {
        id: '1',
        type: 'direct',
        participants: ['1', '2'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        type: 'group',
        name: 'Supplier Team',
        participants: ['1', '2', '3', '4'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  selectChat(chat: Chat) {
    this.selectedChat = chat;
    this.loadMessages(chat.id);
  }

  private loadMessages(chatId: string) {
    this.collaborationService.getChatMessages(chatId)
      .subscribe(messages => {
        this.messages = messages;
      });
  }

  sendMessage() {
    if (this.selectedChat && this.newMessage.trim()) {
      this.collaborationService.sendMessage(this.selectedChat.id, this.newMessage.trim());
      this.newMessage = '';
      this.loadMessages(this.selectedChat.id);
    }
  }

  startNewChat() {
    // Implement new chat functionality
    console.log('Start new chat');
  }

  createGroup() {
    // Implement group creation
    console.log('Create new group');
  }

  getOtherParticipantInitial(chat: Chat): string {
    const otherUserId = chat.participants.find(id => id !== this.currentUser?.id) || '';
    return otherUserId.charAt(0).toUpperCase();
  }

  getOtherParticipantName(chat: Chat): string {
    const otherUserId = chat.participants.find(id => id !== this.currentUser?.id) || '';
    return 'User ' + otherUserId;
  }
} 