import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskPreviewDialogComponent } from './task-preview-dialog/task-preview-dialog.component';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  dueDate: Date;
  assignedTo: string;
  category: string;
  attachments: number;
  comments: number;
  isCritical: boolean;
  isNew: boolean;
  lastViewed?: Date;
  needsFollowUp: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-task-preview',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatDividerModule, 
    MatChipsModule, 
    MatBadgeModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.css']
})
export class TaskPreviewComponent {
  constructor(private router: Router, private dialog: MatDialog) {}
  selectedTask: Task | null = null;
  mode: 'view' | 'create' = 'view';

  tasks: Task[] = [
    {
      id: 1,
      title: 'Review Material Specifications',
      description: 'Review and approve the updated material specifications for Q2 2024 production. Changes include new sustainability requirements and quality standards. Please check all technical parameters and environmental compliance.',
      status: 'pending',
      priority: 'high',
      dueDate: new Date('2024-04-15'),
      assignedTo: 'John Smith',
      category: 'Quality Control',
      attachments: 3,
      comments: 5,
      isCritical: true,
      isNew: true,
      needsFollowUp: false,
      createdAt: new Date('2024-03-25')
    },
    {
      id: 2,
      title: 'Update Supplier Documentation',
      description: 'Update supplier documentation with new ISO certifications and compliance records. Ensure all certificates are current and meet our quality standards. Update digital copies in the system.',
      status: 'in-progress',
      priority: 'medium',
      dueDate: new Date('2024-04-20'),
      assignedTo: 'Sarah Johnson',
      category: 'Documentation',
      attachments: 2,
      comments: 3,
      isCritical: false,
      isNew: false,
      lastViewed: new Date('2024-03-20'),
      needsFollowUp: true,
      createdAt: new Date('2024-03-15')
    },
    {
      id: 3,
      title: 'Price Negotiation Meeting',
      description: 'Prepare and attend price negotiation meeting for raw materials supply for Q3 2024. Review current market rates, prepare cost analysis, and outline volume discounts structure.',
      status: 'pending',
      priority: 'high',
      dueDate: new Date('2024-04-18'),
      assignedTo: 'Mike Wilson',
      category: 'Procurement',
      attachments: 4,
      comments: 7,
      isCritical: true,
      isNew: true,
      needsFollowUp: false,
      createdAt: new Date('2024-03-24')
    },
    {
      id: 4,
      title: 'Quality Audit Preparation',
      description: 'Prepare documentation and samples for upcoming quality audit. Ensure all quality control records are up to date and properly organized. Coordinate with quality team for sample collection.',
      status: 'in-progress',
      priority: 'medium',
      dueDate: new Date('2024-04-25'),
      assignedTo: 'Emily Brown',
      category: 'Quality Control',
      attachments: 6,
      comments: 4,
      isCritical: false,
      isNew: false,
      lastViewed: new Date('2024-03-22'),
      needsFollowUp: false,
      createdAt: new Date('2024-03-10')
    },
    {
      id: 5,
      title: 'Delivery Schedule Review',
      description: 'Review and optimize delivery schedule for May 2024. Coordinate with logistics team to ensure timely deliveries and optimize transportation costs. Update delivery slots in the system.',
      status: 'pending',
      priority: 'low',
      dueDate: new Date('2024-04-30'),
      assignedTo: 'David Clark',
      category: 'Logistics',
      attachments: 2,
      comments: 3,
      isCritical: false,
      isNew: false,
      lastViewed: new Date('2024-03-18'),
      needsFollowUp: true,
      createdAt: new Date('2024-03-01')
    }
  ];

   setMode(mode: 'view' | 'create') {
    this.mode = mode;
    if (mode === 'create') {
      this.selectedTask = null;
    }
  }

  openPreviewDialog(task: Task, event: MouseEvent) {
    event.stopPropagation();
    this.dialog.open(TaskPreviewDialogComponent, {
      data: { task },
      width: '600px',
      maxWidth: '90vw',
      autoFocus: false
    });
  }

  goToTask(task: Task) {
    this.router.navigate(['/tasks', task.id], { state: { task } });
  }

  getPriorityClass(priority: 'high' | 'medium' | 'low'): string {
    const classes: Record<'high' | 'medium' | 'low', string> = {
      high: 'priority-high',
      medium: 'priority-medium',
      low: 'priority-low'
    };
    return classes[priority];
  }

  getStatusClass(status: 'pending' | 'in-progress' | 'completed'): string {
    const classes: Record<'pending' | 'in-progress' | 'completed', string> = {
      'pending': 'status-pending',
      'in-progress': 'status-progress',
      'completed': 'status-completed'
    };
    return classes[status];
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  }
}
