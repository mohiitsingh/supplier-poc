import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskPreviewComponent } from './components/task-preview/task-preview.component';
import { DocumentManagementComponent } from './components/document-management/document-management.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { RequestSummaryComponent } from './components/request-summary/request-summary.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { TicketCommentsComponent } from './components/ticket-comments/ticket-comments.component';
import { ForumComponent } from './components/forum/forum.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'collaboration',
    children: [
      { path: 'chat', component: ChatComponent },
      { path: 'tickets/:id/comments', component: TicketCommentsComponent },
      { path: 'forum', component: ForumComponent }
    ]
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: TaskPreviewComponent },
  { path: 'documents', component: DocumentManagementComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'requests', component: RequestSummaryComponent }
];
