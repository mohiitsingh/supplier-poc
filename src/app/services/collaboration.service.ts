import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  User,
  Message,
  TicketComment,
  ChatMessage,
  Chat,
  ForumTopic,
  ForumPost,
  SearchResult
} from '../models/collaboration.models';

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {
  private currentUser$ = new BehaviorSubject<User | null>(null);
  private chats$ = new BehaviorSubject<Chat[]>([]);
  private messages$ = new BehaviorSubject<ChatMessage[]>([]);
  private ticketComments$ = new BehaviorSubject<TicketComment[]>([]);
  private forumTopics$ = new BehaviorSubject<ForumTopic[]>([]);
  private forumPosts$ = new BehaviorSubject<ForumPost[]>([]);

  constructor() {
    // Initialize with sample data (replace with actual API calls)
    this.loadInitialData();
  }

  // Ticket Comments
  getTicketComments(ticketId: string): Observable<TicketComment[]> {
    return this.ticketComments$.pipe(
      map(comments => comments.filter(comment => comment.ticketId === ticketId))
    );
  }

  addTicketComment(comment: Partial<TicketComment>): void {
    const newComment: TicketComment = {
      id: Date.now().toString(),
      timestamp: new Date(),
      ...comment
    } as TicketComment;

    this.ticketComments$.next([...this.ticketComments$.value, newComment]);
  }

  // Direct Messages
  getDirectChat(otherUserId: string): Observable<Chat | undefined> {
    return this.chats$.pipe(
      map(chats => chats.find(chat => 
        chat.type === 'direct' && 
        chat.participants.includes(otherUserId) &&
        chat.participants.includes(this.currentUser$.value?.id || '')
      ))
    );
  }

  createDirectChat(otherUserId: string): Chat {
    const newChat: Chat = {
      id: Date.now().toString(),
      type: 'direct',
      participants: [this.currentUser$.value?.id || '', otherUserId],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.chats$.next([...this.chats$.value, newChat]);
    return newChat;
  }

  // Group Chat
  createGroupChat(name: string, participants: string[]): Chat {
    const newChat: Chat = {
      id: Date.now().toString(),
      type: 'group',
      name,
      participants,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.chats$.next([...this.chats$.value, newChat]);
    return newChat;
  }

  getChatMessages(chatId: string): Observable<ChatMessage[]> {
    return this.messages$.pipe(
      map(messages => messages.filter(msg => msg.chatId === chatId))
    );
  }

  sendMessage(chatId: string, content: string): void {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      chatId,
      content,
      senderId: this.currentUser$.value?.id || '',
      timestamp: new Date(),
      readBy: [this.currentUser$.value?.id || '']
    };

    this.messages$.next([...this.messages$.value, newMessage]);
    this.updateChatLastMessage(chatId, newMessage);
  }

  // Forum
  createForumTopic(topic: Partial<ForumTopic>): void {
    const newTopic: ForumTopic = {
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: this.currentUser$.value?.id || '',
      ...topic
    } as ForumTopic;

    this.forumTopics$.next([...this.forumTopics$.value, newTopic]);
  }

  getForumTopics(): Observable<ForumTopic[]> {
    return this.forumTopics$.asObservable();
  }

  getForumPosts(topicId: string): Observable<ForumPost[]> {
    return this.forumPosts$.pipe(
      map(posts => posts.filter(post => post.topicId === topicId))
    );
  }

  // Search
  searchCommunications(query: string): Observable<SearchResult[]> {
    const results: SearchResult[] = [];
    
    // Search in ticket comments
    this.ticketComments$.value
      .filter(comment => comment.content.toLowerCase().includes(query.toLowerCase()))
      .forEach(comment => {
        results.push({
          type: 'ticket_comment',
          content: comment.content,
          timestamp: comment.timestamp,
          sender: this.getUserById(comment.senderId),
          context: {
            id: comment.ticketId,
            type: 'ticket'
          }
        });
      });

    // Search in chat messages
    this.messages$.value
      .filter(message => message.content.toLowerCase().includes(query.toLowerCase()))
      .forEach(message => {
        const chat = this.chats$.value.find(c => c.id === message.chatId);
        results.push({
          type: 'chat_message',
          content: message.content,
          timestamp: message.timestamp,
          sender: this.getUserById(message.senderId),
          context: {
            id: message.chatId,
            title: chat?.name,
            type: chat?.type || 'chat'
          }
        });
      });

    // Search in forum posts
    this.forumPosts$.value
      .filter(post => post.content.toLowerCase().includes(query.toLowerCase()))
      .forEach(post => {
        const topic = this.forumTopics$.value.find(t => t.id === post.topicId);
        results.push({
          type: 'forum_post',
          content: post.content,
          timestamp: post.timestamp,
          sender: this.getUserById(post.senderId),
          context: {
            id: post.topicId,
            title: topic?.title,
            type: 'forum'
          }
        });
      });

    return of(results.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
  }

  // Export chat history
  exportChatHistory(chatId: string): Observable<ChatMessage[]> {
    return this.getChatMessages(chatId);
  }

  // Helper methods
  private updateChatLastMessage(chatId: string, message: ChatMessage): void {
    const chats = this.chats$.value;
    const chatIndex = chats.findIndex(chat => chat.id === chatId);
    if (chatIndex !== -1) {
      chats[chatIndex] = {
        ...chats[chatIndex],
        lastMessage: message,
        updatedAt: message.timestamp
      };
      this.chats$.next(chats);
    }
  }

  private getUserById(userId: string): User {
    // Mock implementation - replace with actual user service
    return {
      id: userId,
      name: 'User ' + userId,
      email: `user${userId}@example.com`,
      role: 'organization'
    };
  }

  private loadInitialData(): void {
    // Mock data initialization - replace with actual API calls
    this.currentUser$.next({
      id: '1',
      name: 'Current User',
      email: 'current.user@example.com',
      role: 'organization'
    });
  }
} 