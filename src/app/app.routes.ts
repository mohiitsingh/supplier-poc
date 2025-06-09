import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskPreviewComponent } from './components/task-preview/task-preview.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { RequestSummaryComponent } from './components/request-summary/request-summary.component';
import { HomeComponent } from './components/home/home.component';
import { DocumentManagementComponent } from './document-management/document-management.component';
import { ChatComponent } from './chat/chat.component';
import { PerformanceMatrixComponent } from './performance-matrix/performance-matrix.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { 
    path: 'collaboration',
    children: [
      { path: 'chat', component: ChatComponent }
    ]
  },
  { path: 'tasks', 
    children: [
      { path: 'document', component: DocumentManagementComponent},
      { path: 'create', component: TaskPreviewComponent }
    ]
   },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'requests', component: RequestSummaryComponent },
  {
    path: 'performance', component: PerformanceMatrixComponent
  }
];
