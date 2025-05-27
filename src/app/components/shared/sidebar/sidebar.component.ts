import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  navItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/tasks', icon: 'task', label: 'Tasks' },
    { path: '/documents', icon: 'folder', label: 'Documents' },
    { path: '/notifications', icon: 'notifications', label: 'Notifications' },
    { path: '/requests', icon: 'assignment', label: 'Requests' }
  ];
}
