export interface User {
  id: string;
  name: string;
  email: string;
  role: 'supplier' | 'organization' | 'admin';
  avatar?: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
  attachments?: Attachment[];
  isEdited?: boolean;
  editedAt?: Date;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface TicketComment extends Message {
  ticketId: string;
  parentCommentId?: string; // For threaded comments
  reactions?: CommentReaction[];
}

export interface CommentReaction {
  userId: string;
  type: '👍' | '👎' | '❤️' | '😄' | '🎉' | '❓';
}

export interface ChatMessage extends Message {
  chatId: string;
  readBy: string[]; // Array of user IDs who have read the message
}

export interface Chat {
  id: string;
  type: 'direct' | 'group';
  name?: string; // For group chats
  participants: string[]; // Array of user IDs
  lastMessage?: ChatMessage;
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumTopic {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  category: string;
  isLocked?: boolean;
  isPinned?: boolean;
}

export interface ForumPost extends Message {
  topicId: string;
  title?: string;
  isAnswer?: boolean; // For Q&A style forums
}

export interface SearchResult {
  type: 'ticket_comment' | 'chat_message' | 'forum_post';
  content: string;
  timestamp: Date;
  sender: User;
  context: {
    id: string; // ID of the parent (ticket/chat/topic)
    title?: string;
    type: string;
  };
} 