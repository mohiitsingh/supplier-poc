import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

interface NavItem {
  path?: string;
  icon: string;
  label: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isCollapsed = true;
  hoveredItem: NavItem | null = null;

  navItems: NavItem[] = [
    {
      path: '/dashboard',
      icon: 'dashboard',
      label: 'Dashboard'
    },
    {
      path: '/tasks',
      icon: 'task',
      label: 'Task Management',
      children: [
        {
          path: '/tasks/view',
          icon: 'checklist',
          label: 'View Task'
        },
        {
          path: '/tasks/create',
          icon: 'add_task',
          label: 'Create Task'
        }
      ]
    },
    {
      path: '/collaboration',
      icon: 'groups',
      label: 'Collaboration Tool',
      children: [
        {
          path: '/collaboration/chat',
          icon: 'person',
          label: 'One to One Chat'
        },
        {
          path: '/collaboration/group',
          icon: 'forum',
          label: 'Group Chat'
        }
      ]
    },
    {
      path: '/performance',
      icon: 'analytics',
      label: 'Performance Matrix'
    },
    {
      path: '/forum',
      icon: 'forum',
      label: 'Discussion Forum'
    },
    {
      path: '/support',
      icon: 'support',
      label: 'Support Training Resource',
      children: [
        {
          path: '/support/faq',
          icon: 'help',
          label: 'FAQs'
        },
        {
          path: '/support/training',
          icon: 'school',
          label: 'Training Documentation'
        },
        {
          path: '/support/contact',
          icon: 'contact_support',
          label: 'Contact Information'
        },
        {
          path: '/support/guide',
          icon: 'menu_book',
          label: 'Guide for Navigating Tool'
        }
      ]
    },
    {
      path: '/admin',
      icon: 'admin_panel_settings',
      label: 'System Admin'
    }
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  onMouseEnter(item: NavItem) {
    if (item.children) {
      this.hoveredItem = item;
    }
  }

  onMouseLeave() {
    this.hoveredItem = null;
  }
}
