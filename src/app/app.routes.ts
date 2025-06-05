import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskPreviewComponent } from './components/task-preview/task-preview.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { RequestSummaryComponent } from './components/request-summary/request-summary.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: TaskPreviewComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'requests', component: RequestSummaryComponent }
];
