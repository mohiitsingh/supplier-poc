import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskPreviewComponent } from './components/task-preview/task-preview.component';
import { DocumentManagementComponent } from './components/document-management/document-management.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { RequestSummaryComponent } from './components/request-summary/request-summary.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: TaskPreviewComponent },
  { path: 'documents', component: DocumentManagementComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'requests', component: RequestSummaryComponent }
];
